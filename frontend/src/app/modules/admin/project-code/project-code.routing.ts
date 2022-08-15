import { Route } from '@angular/router';
import { ProjectCodeComponent } from './project-code.component';
import { ProjectCodeResolver } from './project-code.resolvers';

export const projectCodeRoutes: Route[] = [
    {
        path     : '',
        component: ProjectCodeComponent,
        resolve  : {
            data: ProjectCodeResolver
        }
    }
];
