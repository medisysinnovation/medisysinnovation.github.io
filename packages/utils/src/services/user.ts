import request from "../network/baseRequest";

import { GET, PUT } from "../network/request";
import config from "../../../../config";

import { User } from "../../../../config/interfaces/response/User";

export interface ChangePasswordFormValues {
  currentPassword: string;
  newPassword: string;
}

const { endpoint } = config.network;
export const query = (): Promise<any> => {
  return GET(endpoint.currentUser);
};

export const changePassword = (
  payload: ChangePasswordFormValues
): Promise<any> => {
  return PUT(endpoint.changePassword, payload);
};

export async function queryNotices(): Promise<any> {
  return request("/api/notices");
}

export async function updateCurrent(payload: any): Promise<User> {
  return PUT(endpoint.currentUser, payload);
}
