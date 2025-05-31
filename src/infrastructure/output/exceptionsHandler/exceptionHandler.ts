import { ErrorFormatterIntPort } from "../../../application/output/errorFormaterIntPort";
import { CustumError } from "./customErrors/customErrors";

export class ExceptionHandler implements ErrorFormatterIntPort {
    errorExistsEntity(message: string): never {
        throw CustumError.notFound(message);
    }
}