import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import suneditor from 'suneditor'

// How to import plugins
import list from 'suneditor/src/plugins/submenu/list'
import {font, formatBlock, image, paragraphStyle, table} from 'suneditor/src/plugins'
import {link} from 'suneditor/src/plugins'
import {blockquote} from 'suneditor/src/plugins'
// How to import language files (default: en)
import de from 'suneditor/src/lang/de'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public edit=true;
  public teaserEditor:any;
  public mainEditor:any;
  @ViewChild('imgPreviewElement') public imgPreviewElement : ElementRef | undefined;
  @ViewChild('teaserElement') public  teaserElement : ElementRef | undefined;
  @ViewChild('mainElement') public  mainElement : ElementRef | undefined;
   


  //3 Stunden 16:10 - 19:10

  
   constructor() { }
   getDataURI(evt:Event) {
    const tgt = evt.target
    const files = (tgt as any).files;
        if (FileReader && files && files.length) {
        const fr = new FileReader();
        fr.onload = () =>{
            (this.imgPreviewElement!.nativeElement as any).src = fr.result;
            this.content.mainImage = fr.result! as string;
        }
        fr.readAsDataURL(files[0]);
    }
  }
toggleEdit(){
  this.edit = !this.edit;

}
   ngAfterViewInit(): void {
    this.mainEditor = suneditor.create(this.mainElement?.nativeElement, {
      plugins: [formatBlock,table, image, list, blockquote, link],
      mode: 'classic',
      linkNoPrefix: true,
      buttonList: [
        ['formatBlock', 'blockquote', 'link'],
          ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
          ['list', 'table', 'image']
      ],
      lang: de
  });
     this.teaserEditor = suneditor.create(this.teaserElement?.nativeElement, {
       plugins: [font, list, blockquote, link],
       mode: 'balloon',
       linkNoPrefix: true,
       buttonList: [
           ['link']
       ],
       lang: de
   })
   this.teaserEditor.setContents(this.content.teaser)
   this.mainEditor.setContents(this.content.main)

  }


    save(){
      this.content.teaser = this.teaserEditor.getContents();
      this.content.main = this.mainEditor.getContents();
      this.content.createdAt = this.content.createdAt || new Date();
      this.content.lastModifiedAt = new Date();
      localStorage.setItem('content', JSON.stringify(this.content));
      console.log(this.content);
    }
    
    load(){
      this.content = localStorage.getItem('content') ? JSON.parse(localStorage.getItem('content')!) : this.content;
    }

    addMassnahme(){
      this.content.massnahmen = [ ...this.content.massnahmen, {
        art: "",
        name: "",
        gewichtung: ""
      }]

    }

    removeMassnahme(m:any){
      const t = this.content.massnahmen.findIndex((ma:any) => ma === m);
      if (t){
        const b = [...this.content.massnahmen];
        b.splice(t,1);
        this.content.massnahmen = b;
      }
    }
    ngOnInit(){
      this.load()
    }
    content = {
      heading: "Ein Vebrundsangebot",
      teaser: "Ein TEaser für das Verbundsangebot",
      main: "",
      mainImage: "",
      massnahmen: ([] as any[]),
      createdAt: (undefined as Date|undefined),
      lastModifiedAt: (undefined as Date|undefined)
    }
}
