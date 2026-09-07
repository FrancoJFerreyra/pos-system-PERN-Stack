import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/apiClient";
import type { ApiError, DomainErrorPayload } from "../types/api";

export interface ResourceCallbacks<T> {
  onListSuccess?: (data: T[]) => void;
  onDetailSuccess?: (data: T) => void;
  onCreateSuccess?: (data: T) => void;
  onUpdateSuccess?: (data: T) => void;
  onDeleteSuccess?: (id: number | string) => void;
  onError?: (error: ApiError) => void;
}

export interface UseResourceOptions<T> extends ResourceCallbacks<T> {
  params?: Record<string, unknown>;
  scope?: string;
}

interface Envelope<T> {
  data: T;
}

const buildKey = (resource: string, scope?: string, suffix?: string | number) =>
  [resource, scope, suffix].filter((part) => part !== undefined && part !== "");

export const useResource = <T>(
  resource: string,
  options?: UseResourceOptions<T>,
) => {
  const queryClient = useQueryClient();

  const params = { populate: "*", ...options?.params };
  const listKey = buildKey(resource, options?.scope);

  const invalidateList = () =>
    queryClient.invalidateQueries({ queryKey: listKey });

  const isDomainErrorPayload = (
    payload: unknown,
  ): payload is DomainErrorPayload =>
    typeof payload === "object" &&
    payload !== null &&
    "code" in payload &&
    "message" in payload;

  const toApiError = (error: unknown): ApiError => {
    const axiosError = error as {
      response?: { status?: number; data?: unknown };
      message?: string;
    };
    const payload = axiosError.response?.data;

    if (isDomainErrorPayload(payload)) {
      return {
        message: payload.message,
        code: payload.code,
        name: payload.name,
        data: payload.data,
        httpStatus: axiosError.response?.status,
      };
    }

    if (
      typeof payload === "object" &&
      payload !== null &&
      "message" in payload
    ) {
      return {
        message: String((payload as { message: unknown }).message),
        name:
          "name" in payload
            ? String((payload as { name: unknown }).name)
            : undefined,
        httpStatus: axiosError.response?.status,
      };
    }

    return {
      message: axiosError.message ?? "unknown error",
      httpStatus: axiosError.response?.status,
    };
  };

  const useList = (enabled = true): UseQueryResult<T[], ApiError> =>
    useQuery<T[], ApiError>({
      queryKey: listKey,
      queryFn: async () => {
        try {
          const { data } = await apiClient.get<Envelope<T[]> | T[]>(
            `/api/${resource}`,
            { params },
          );
          const list = Array.isArray(data) ? data : data.data;
          options?.onListSuccess?.(list);
          return list;
        } catch (error) {
          const apiError = toApiError(error);
          options?.onError?.(apiError);
          throw apiError;
        }
      },
      enabled,
    });

  const useDetail = (
    id?: number | string,
    enabled = true,
  ): UseQueryResult<T, ApiError> =>
    useQuery<T, ApiError>({
      queryKey: buildKey(resource, options?.scope, id),
      queryFn: async () => {
        try {
          const { data } = await apiClient.get<Envelope<T> | T>(
            `/api/${resource}/${id}`,
            { params },
          );
          const entity = (data as Envelope<T>).data ?? (data as T);
          options?.onDetailSuccess?.(entity);
          return entity;
        } catch (error) {
          const apiError = toApiError(error);
          options?.onError?.(apiError);
          throw apiError;
        }
      },
      enabled: enabled && Boolean(id),
    });

  const useCreate = (): UseMutationResult<
    T,
    ApiError,
    Record<string, unknown> | FormData
  > =>
    useMutation<T, ApiError, Record<string, unknown> | FormData>({
      mutationFn: async (payload) => {
        const { data } = await apiClient.post<Envelope<T> | T>(
          `/api/${resource}`,
          payload,
          { params },
        );
        return (data as Envelope<T>).data ?? (data as T);
      },
      onSuccess: (data) => {
        options?.onCreateSuccess?.(data);
        invalidateList();
      },
      onError: (error) => options?.onError?.(toApiError(error)),
    });

  const useUpdate = (
    id: number | string,
  ): UseMutationResult<T, ApiError, Record<string, unknown> | FormData> =>
    useMutation<T, ApiError, Record<string, unknown> | FormData>({
      mutationFn: async (payload) => {
        const { data } = await apiClient.put<Envelope<T> | T>(
          `/api/${resource}/${id}`,
          payload,
          { params },
        );
        return (data as Envelope<T>).data ?? (data as T);
      },
      onSuccess: (data) => {
        options?.onUpdateSuccess?.(data);
        invalidateList();
        queryClient.invalidateQueries({
          queryKey: buildKey(resource, options?.scope, id),
        });
      },
      onError: (error) => options?.onError?.(toApiError(error)),
    });

  const useRemove = (): UseMutationResult<
    number | string,
    ApiError,
    number | string
  > =>
    useMutation<number | string, ApiError, number | string>({
      mutationFn: async (id) => {
        await apiClient.delete(`/api/${resource}/${id}`);
        return id;
      },
      onSuccess: (id) => {
        options?.onDeleteSuccess?.(id);
        invalidateList();
      },
      onError: (error) => options?.onError?.(toApiError(error)),
    });

  const setListData = (updater: (current: T[] | undefined) => T[]) =>
    queryClient.setQueryData<T[]>(listKey, updater);

  return {
    useList,
    useDetail,
    useCreate,
    useUpdate,
    useRemove,
    setListData,
    invalidateList,
  };
};
