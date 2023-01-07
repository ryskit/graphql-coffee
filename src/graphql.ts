/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Coffee {
  id: number;
  name: string;
  brand: string;
  flavors?: Nullable<string[]>;
}

export abstract class IQuery {
  coffees: Coffee[];
}

type Nullable<T> = T | null;
