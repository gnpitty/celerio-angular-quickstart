//
// Project home: https://github.com/jaxio/celerio-angular-quickstart
// 
// Source code generated by Celerio, an Open Source code generator by Jaxio.
// Documentation: http://www.jaxio.com/documentation/celerio/
// Source code: https://github.com/jaxio/celerio/
// Follow us on twitter: @jaxiosoft
// This header can be customized in Celerio conf...
// Template pack-angular:web/src/app/entities/entity-detail.component.ts.e.vm
//
import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/primeng';
import { MessageService} from '../../service/message.service';
import {UseCase1} from './useCase1';
import {UseCase1Service} from './useCase1.service';

@Component({
    moduleId: module.id,
	templateUrl: 'useCase1-detail.component.html',
	selector: 'useCase1-detail',
})
export class UseCase1DetailComponent implements OnInit, OnDestroy {
    useCase1 : UseCase1;

    private params_subscription: any;


    @Input() sub : boolean = false;
    @Output() onSaveClicked = new EventEmitter<UseCase1>();
    @Output() onCancelClicked = new EventEmitter();

    constructor(private route: ActivatedRoute, private router: Router, private messageService: MessageService, private useCase1Service: UseCase1Service) {
    }

    ngOnInit() {
        if (this.sub) {
            return;
        }

        this.params_subscription = this.route.params.subscribe(params => {
            let id = params['id'];
            console.log('ngOnInit for useCase1-detail ' + id);

            if (id === 'new') {
                this.useCase1 = new UseCase1();
            } else {
                this.useCase1Service.getUseCase1(id)
                    .subscribe(useCase1 => {
                            this.useCase1 = useCase1;
                        },
                        error =>  this.messageService.error('ngOnInit error', error)
                    );
            }
        });
    }

    ngOnDestroy() {
        if (!this.sub) {
            this.params_subscription.unsubscribe();
        }
    }

    onSave() {
        this.useCase1Service.update(this.useCase1).
            subscribe(
                useCase1 => {
                    this.useCase1 = useCase1;
                    if (this.sub) {
                        this.onSaveClicked.emit(this.useCase1);
                        this.messageService.info('Saved OK and msg emitted', 'Angular Rocks!')
                    } else {
                        this.messageService.info('Saved OK', 'Angular Rocks!')
                    }
                },
                error =>  this.messageService.error('Could not save', error)
            );
    }

    onCancel() {
        if (this.sub) {
            this.onCancelClicked.emit("cancel");
            this.messageService.info('Cancel clicked and msg emitted', 'Angular Rocks!')
        }
    }

}
