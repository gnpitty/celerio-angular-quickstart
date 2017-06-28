//
// Project home: https://github.com/jaxio/celerio-angular-quickstart
// 
// Source code generated by Celerio, an Open Source code generator by Jaxio.
// Documentation: http://www.jaxio.com/documentation/celerio/
// Source code: https://github.com/jaxio/celerio/
// Follow us on twitter: @jaxiosoft
// This header can be customized in Celerio conf...
// Template pack-angular:web/src/app/support/email.validator.ts.p.vm
//
import {Directive, forwardRef} from '@angular/core';
import {NG_VALIDATORS, FormControl} from '@angular/forms';

// Resource: http://blog.thoughtram.io/angular/2016/03/14/custom-validators-in-angular-2.html

@Directive({
    selector: '[validateEmail][ngModel],[validateEmail][formControl]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidator), multi: true }
    ]
})
export class EmailValidator {
    private EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    validate(c: FormControl) {

        return c.value == null || c.value == "" || this.EMAIL_REGEXP.test(c.value) ? null : {
            validateEmail: {
                valid: false
            }
        };
    }
}
