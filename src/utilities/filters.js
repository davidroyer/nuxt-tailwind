import { format } from "date-fns";
import { slugifyText } from "@/utilities/helpers";

export const slugFilter = slugifyText;

export const dateFilter = date => format(date, "MMMM Do, YYYY");
