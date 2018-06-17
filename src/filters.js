import Vue from 'vue';
import { dateFilter, slugFilter } from '../lib/filters';

Vue.filter('date', dateFilter);
Vue.filter('slugify', slugFilter);
