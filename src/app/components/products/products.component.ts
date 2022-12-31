import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products=[ ];
  page=1

  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  changePage(e){
    this.page=e.page
    this.getProducts();
  }

  getProducts(){
    let body={
      page:this.page,
      limit:20
    }
    this.productService.getProducts(body).subscribe((res:any)=>{
      console.log(res);
      this.products=res.output.products
    })
  }


}
