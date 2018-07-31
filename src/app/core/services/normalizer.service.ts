import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { normalize, denormalize, schema } from 'normalizr';

import {
  Case,
  ApiCase,
  NormalizerOutput,
  NormalizedCase,
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
export class NormalizerService {
  normalizeCase(apiCase: ApiCase): Observable<object> {
    const normalizerOutput: NormalizerOutput = normalize(apiCase, caseSchema);
    const caseId = normalizerOutput.result;

    const fields: Field[] = (<any>Object).values(
      normalizerOutput.entities.fields,
    );
    const specs: Spec[] = (<any>Object).values(normalizerOutput.entities.specs);

    const caseObject: Case = normalizerOutput.entities.cases[caseId];

    const normalizedCase: NormalizedCase = {
      case: caseObject,
      specs: specs,
      fields: fields,
    };

    return of(normalizedCase);
  }
}
