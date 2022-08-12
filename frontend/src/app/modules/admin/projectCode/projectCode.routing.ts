import { Route } from '@angular/router';
import { ProjectCodeComponent } from './projectCode.component';
import { ProjectCodeResolver } from './projectCode.resolvers';

export const projectCodeRoutes: Route[] = [
    {
        path     : '',
        component: ProjectCodeComponent,
        resolve  : {
            data: ProjectCodeResolver
        }
    }
];
