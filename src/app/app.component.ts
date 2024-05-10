import { Component } from '@angular/core';
import { ProductService } from './services/product.service';
import { Product } from './models/product.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  products: Product[] = []
  productForm: FormGroup

  constructor(private productService: ProductService, private formBuilder: FormBuilder) {
    this.productService.get().subscribe(result => {
      this.products = result;
    })
    this.productForm = this.formBuilder.group({
      nom: [null],
      imageFile: [null],
    })
  }

  selectFile(event: any) {
    this.productForm.controls['imageFile'].setValue(event.target.files[0]);
  }

  save() {
    this.productService.post(this.productForm.value).subscribe(() => {
      this.productService.get().subscribe(result => {
        this.products = result;
      })
    })
  }
}
