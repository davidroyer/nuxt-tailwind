import Vue from "vue";
import { dateFilter, slugFilter } from "@/utilities/filters";

Vue.filter("date", dateFilter);
Vue.filter("slugify", slugFilter);
