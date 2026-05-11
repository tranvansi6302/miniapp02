import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
import { createStringValue } from '~/apis/common/common';
import { executeApiQuery } from '~/utils/api.util';
import type { LangResponsesType } from '~/types/defines/config-lang/responses/lang-config.type';
import { GetAllConfigLangsActivedRequest, GetDetailConfigLangRequest } from './proto_new/CommonService/Queries/config_lang_query';
import { ConfigLangQueryClient } from './proto_new/CommonService/Queries/config_lang_query.client';

const transport = new GrpcWebFetchTransport({
    baseUrl: 'https://8a5da52ed126447d359e70c05721a8aa.homebooking.global/home-booking/query/commons'
});

const langQueryClient = new ConfigLangQueryClient(transport);

export const langApi = {
    getAllLanguages: async () => {
        const request = GetAllConfigLangsActivedRequest.create();

        return executeApiQuery({
            clientMethod: langQueryClient.getAllConfigLangsActived.bind(langQueryClient),
            request,
            defaultValue: [] as LangResponsesType[],
        });
    },
    getLanguageDetail: async (body: { id: string }) => {
        const request = GetDetailConfigLangRequest.create({
            id: createStringValue(body.id),
        });

        return executeApiQuery({
            clientMethod: langQueryClient.getDetailConfigLang.bind(langQueryClient),
            request,
            defaultValue: {} as LangResponsesType,
        });
    },
};
