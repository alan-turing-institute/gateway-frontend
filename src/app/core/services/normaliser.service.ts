import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { normalize, denormalize, schema } from 'normalizr';

import {
  Case,
  ApiCase,
  NormalisedCase,
  FlattenedCase,
} from '@simulations/models/case';
import { Field } from '@simulations/models/field';
import { Spec } from '@simulations/models/spec';
import { environment } from '@env/environment';

// Case schema definition
const specSchema = new schema.Entity('specs');
const specListSchema = new schema.Array(specSchema);
const fieldSchema = new schema.Entity('fields');
const fieldListSchema = new schema.Array(fieldSchema);
fieldSchema.define({ fields: fieldListSchema, specs: specListSchema }); // allow recursion
const caseSchema = new schema.Entity('cases', { fields: fieldListSchema });

@Injectable()
export class NormaliserService {
  flattenCase(apiCase: ApiCase): Observable<object> {
    const normalisedCase: NormalisedCase = normalize(apiCase, caseSchema);
    const flattenedCase: FlattenedCase = this.flatten(normalisedCase);
    return of(flattenedCase);
  }

  flatten(normalisedCase: NormalisedCase): FlattenedCase {
    const caseId = normalisedCase.result;

    const fields: Field[] = (<any>Object).values(
      normalisedCase.entities.fields,
    );
    const specs: Spec[] = (<any>Object).values(normalisedCase.entities.specs);
    const caseObject: Case = normalisedCase.entities.cases[caseId];
    const flatCase: FlattenedCase = {
      case: caseObject,
      specs: specs,
      fields: fields,
    };

    return flatCase;
  }
}
