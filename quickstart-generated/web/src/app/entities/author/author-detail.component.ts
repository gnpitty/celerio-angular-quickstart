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
import {Author} from './author';
import {AuthorService} from './author.service';

@Component({
    moduleId: module.id,
	templateUrl: 'author-detail.component.html',
	selector: 'author-detail',
})
export class AuthorDetailComponent implements OnInit, OnDestroy {
    author : Author;

    private params_subscription: any;

    showBooks : boolean = true;
    showProjects : boolean = true;

    @Input() sub : boolean = false;
    @Input() // used to pass the parent when creating a new Author
    set favoriteAuthor(favoriteAuthor : Author) {
        this.author = new Author();
        this.author.favoriteAuthor = favoriteAuthor;
    }

    @Output() onSaveClicked = new EventEmitter<Author>();
    @Output() onCancelClicked = new EventEmitter();
    civilityOptions: SelectItem[];

    constructor(private route: ActivatedRoute, private router: Router, private messageService: MessageService, private authorService: AuthorService) {
        this.civilityOptions = [];
        this.civilityOptions.push({"label": "Mister", 'value': "MR"});
        this.civilityOptions.push({"label": "Miss", 'value': "MS"});
    }

    ngOnInit() {
        if (this.sub) {
            return;
        }

        this.params_subscription = this.route.params.subscribe(params => {
            let id = params['id'];
            console.log('ngOnInit for author-detail ' + id);

            if (id === 'new') {
                this.author = new Author();
            } else {
                this.authorService.getAuthor(id)
                    .subscribe(author => {
                            this.author = author;
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

    gotoFavoriteAuthor() {
        this.router.navigate(['/author', this.author.favoriteAuthor.id]);
    }

    clearFavoriteAuthor() {
        this.author.favoriteAuthor = null;
    }

    onSave() {
        this.authorService.update(this.author).
            subscribe(
                author => {
                    this.author = author;
                    if (this.sub) {
                        this.onSaveClicked.emit(this.author);
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
