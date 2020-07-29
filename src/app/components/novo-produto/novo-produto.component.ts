import { NavigationService } from './../../services/navigation.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.css']
})
export class NovoProdutoComponent implements OnInit {

  nome = '';
  descricao = '';
  public novoProdutoForm: FormGroup;

  componentesSub = ['Coolers', 'Discos Rígidos', 'Drivers', 'Memórias RAM', 'Placas-Mãe', 'Placas de Som', 'Placas de Vídeo', 'Processadores'];
  perifericosSub = ['Acessórios', 'Adaptadores', 'Cabos', 'Energia', 'Gabinetes', 'Headsets', 'Monitores', 'Mouses', 'Teclados', 'Softwares', 'Som'];

  categorias = ['Componentes', 'Periféricos'];
  subCategorias = [];

  categoria = 'Componentes';
  subCategoria = 'Coolers';



  constructor(
    private _navServ: NavigationService,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
  ) {
    this._navServ.setShowSideNav('none');
    this.subCategorias = this.componentesSub;
    this.initForms();
    
  }

  ngOnInit(): void {
  }

  getFormValidationErrors(formGroup: FormGroup) {
    let errors = false;
    Object.keys(formGroup.controls).forEach(key => {
      const controlErrors: ValidationErrors = formGroup.get(key).errors;
      if (controlErrors !== null) {
        errors = true;
      }
    });
    return errors;
  }

  initForms() {
    this.novoProdutoForm = this._fb.group({
      nome: ['', Validators.required],
      descricao: ['', [Validators.required]]
    })
  }

  adicionarProduto() {
    if (this.getFormValidationErrors(this.novoProdutoForm)) {
      this._snackBar.open('Verifique campos com erros', 'Erro', { duration: 2000, panelClass: ['snackbar-error'] });
      return;
    }
    this.novoProdutoForm.get('nome').setValue('');
    this.novoProdutoForm.get('descricao').setValue('');
    this._snackBar.open('Produto adicionado com sucesso', 'Novo produto', { duration: 5000, panelClass: ['snackbar-success'] });
  }

  mudarSubCategoria(event) {
    if (event === 'Periféricos') {
      this.subCategorias = this.perifericosSub;
    } else {
      this.subCategorias = this.componentesSub;
    }
  }
}
