import { IHourResponse } from "./../interfaces/HourInterfaces";
import { toSyntax } from "./../libraries/util";

import * as fp from "lodash/fp";

export const hourMapper = {
  toEntity: hourDTO => toSyntax(hourDTO, fp.camelCase),
  toDTO: (hourEntity): IHourResponse =>
    <IHourResponse>toSyntax(hourEntity, fp.snakeCase)
};
