import { Suppliers } from "../../components/entities/Suppliers";
import { APIGetClient } from "./api-client";

export default new APIGetClient<Suppliers>("/party/allSupplier");
