import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { CvService } from '../cv.service';

@Component({
  selector: 'app-cv-loader',
  templateUrl: './cv-loader.component.html',
  styleUrls: ['./cv-loader.component.scss']
})
export class CvLoaderComponent {

    constructor(
        private cvService: CvService,
        private router: Router
    ) {}

    @Output() fileSelect: EventEmitter<string> = new EventEmitter();
    cvjson: string;
    error = '';

    onFileSelected(event) {
        const file = event.target.files[0];
        const fileReader = new FileReader();

        fileReader.onload = () => {
            try {
                const data: string = JSON.parse(<string>fileReader.result);
                this.error = '';
                this.router.navigate(['/cv']);
                this.cvService.setCv(data);
            } catch (e) {
                this.error = 'Please, choose a valid JSON file.';
            }
        };

        fileReader.onerror = () => {
            this.error = 'Error while reading the file. Please try again.';
            fileReader.abort();
        };

        fileReader.readAsText(file);
    }

    onExampleClick() {
        const data = require('../../../assets/example.json');
        this.router.navigate(['/cv']);
        this.cvService.setCv(data);
    }

}
