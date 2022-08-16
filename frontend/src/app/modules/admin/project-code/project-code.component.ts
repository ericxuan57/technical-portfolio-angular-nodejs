import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ADTSettings, } from 'angular-datatables/src/models/settings';
import { Subject, takeUntil } from 'rxjs';
import { ApexOptions } from 'ng-apexcharts';
import { ProjectCodeService } from '../../../core/services/project-code.service';
import { DialogComponent } from './components/dialog/dialog.component';
// import { ProjectCodeTableComponent } from './components/projectCodeTable/table.component';

@Component({
    selector       : 'projectCode',
    templateUrl    : './project-code.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCodeComponent implements OnInit, OnDestroy
{
    chartGithubIssues: ApexOptions = {};
    chartTaskDistribution: ApexOptions = {};
    chartBudgetDistribution: ApexOptions = {};
    chartWeeklyExpenses: ApexOptions = {};
    chartMonthlyExpenses: ApexOptions = {};
    chartYearlyExpenses: ApexOptions = {};
    data: any;

    dtOptions: ADTSettings = {};

    selectedProjectCode: string = 'ACME Corp. Backend App';
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    // public table: ProjectCodeTableComponent

    /**
     * Constructor
     */
    constructor(
        private _projectCodeService: ProjectCodeService,
        private _router: Router,
        public dialog: MatDialog
    )
    {
    }

    showCreationModal(): void {
        this._projectCodeService.getNecessaryInfo()
            .subscribe(
                (response) => {
                    
                    const dialogRef = this.dialog.open(DialogComponent, {
                        width: 'auto',
                        data: { activities: response.activities, dependency: response.dependency, headquarter: response.headquarter, orderNumber: response.orderNumber, years: response.years, today: response.today},
                    });

                    dialogRef.afterClosed().subscribe(result => {
                        // console.log('The dialog was closed');
                    });
                }
            );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the data
        this._projectCodeService.getProjectCodes()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                // Store the data
                this.data = data;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Fix the SVG fill references. This fix must be applied to all ApexCharts
     * charts in order to fix 'black color on gradient fills on certain browsers'
     * issue caused by the '<base>' tag.
     *
     * Fix based on https://gist.github.com/Kamshak/c84cdc175209d1a30f711abd6a81d472
     *
     * @param element
     * @private
     */
}