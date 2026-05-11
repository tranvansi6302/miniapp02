import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
import { createBoolValue, createInt32Value, createStringValue } from '~/apis/common/common';
import { executeApiQuery } from '~/utils/api.util';
import {
    GetAllBookingCatalogServicesRequest,
    GetDetailBookingCatalogServiceRequest
} from './proto_new/BookingService/Queries/booking_catalog_service_query';
import { BookingCatalogServiceQueryClient } from './proto_new/BookingService/Queries/booking_catalog_service_query.client';
import type {
    GetAllBookingCatalogServicesRequestType,
    GetDetailBookingCatalogServiceRequestType
} from '~/types/services/requests/service.type';
import type { ServiceDetailResponseType, ServiceResponseType } from '~/types/services/responses/service.type';

const transport = new GrpcWebFetchTransport({
    baseUrl: `https://8a5da52ed126447d359e70c05721a8aa.homebooking.global/home-booking/query/bookings`
});

const serviceQueryClient = new BookingCatalogServiceQueryClient(transport);

export const serviceApi = {
    getAllServices: async (body: GetAllBookingCatalogServicesRequestType) => {
        const request = GetAllBookingCatalogServicesRequest.create({
            serName: body.serName ? createStringValue(body.serName) : undefined,
            servPid: body.servPid !== undefined ? createInt32Value(Number(body.servPid)) : undefined,
            isOnlyChildren: body.isOnlyChildren !== undefined ? createBoolValue(body.isOnlyChildren) : undefined,
            pagingOption: body.pagingOption
                ? {
                    pageNumber: body.pagingOption.pageNumber ? createInt32Value(body.pagingOption.pageNumber) : undefined,
                    pageSize: body.pagingOption.pageSize ? createInt32Value(body.pagingOption.pageSize) : undefined
                }
                : undefined,
            orderBy: body.orderByOption?.map((item) => ({
                field: item.field,
                isDescending: item.isDescending
            }))
        });

        return executeApiQuery({
            clientMethod: serviceQueryClient.getAllBookingCatalogServices.bind(serviceQueryClient),
            request,
            defaultValue: [] as ServiceResponseType[]
        });
    },
    getServiceDetail: async (body: GetDetailBookingCatalogServiceRequestType) => {
        const request = GetDetailBookingCatalogServiceRequest.create({
            id: createInt32Value(body.id)
        });

        return executeApiQuery({
            clientMethod: serviceQueryClient.getDetailBookingCatalogService.bind(serviceQueryClient),
            request,
            defaultValue: {} as ServiceDetailResponseType
        });
    }
};
