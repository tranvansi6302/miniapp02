import type { PartialMessage } from "@protobuf-ts/runtime";
import { BoolValue, DoubleValue, Int32Value, StringValue } from "../proto_new/Utils/google/protobuf/wrappers";
import { NullListInt32 } from "../proto_new/Utils/common";

export const createInt32Value = (value?: number) =>
    value !== undefined ? Int32Value.create({ value }) : undefined;

export const createDoubleValue = (value?: number) =>
    value !== undefined ? DoubleValue.create({ value }) : undefined;

export const createBoolValue = (value?: boolean) =>
    value !== undefined ? BoolValue.create({ value }) : undefined;

export const createStringValue = (value?: string) =>
    value !== undefined ? StringValue.create({ value }) : undefined;


export function parseNullListInt32(input: string): PartialMessage<NullListInt32> {
    return {
        value: input
            .split(",")
            .map(s => Number(s.trim()))
            .filter(n => !isNaN(n))
            .map(n => (n)),
    };
}