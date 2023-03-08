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
  public edit=false;
  public teaserEditor:any;
  public mainEditor:any;
  @ViewChild('imgPreviewElement') public imgPreviewElement : ElementRef | undefined;
  @ViewChild('teaserElement') public  teaserElement : ElementRef | undefined;
  @ViewChild('mainElement') public  mainElement : ElementRef | undefined;
   


  //3 Stunden 16:10 - 19:10


   constructor() { }
   getDataURI(evt:Event, mainOrContact:string) {
    const tgt = evt.target
    const files = (tgt as any).files;
        if (FileReader && files && files.length) {
        const fr = new FileReader();
        fr.onload = () =>{
            //(this.imgPreviewElement!.nativeElement as any).src = fr.result;
            if (mainOrContact === 'main'){
              this.content.mainImage = fr.result! as string;
            }
            if (mainOrContact === 'contact'){
              this.content.contact.image = fr.result! as string;
            }
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
       mode: 'classic',
       linkNoPrefix: true,
       buttonList: [
           ['removeFormat']
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
      localStorage.setItem('angebote', JSON.stringify(this.angebote));
      console.log(this.content);
    }
    
    load(){
      this.angebote = localStorage.getItem('angebote') ? JSON.parse(localStorage.getItem('angebote')!) : this.angebote;
      this.content = this.angebote[0];
    }

    addMassnahme(){
      this.content.massnahmen = [ ...this.content.massnahmen, {
        art: "",
        name: "",
        gewichtung: ""
      }]
    }
    pickAngebot(i:number){
      this.content = this.angebote[i];
      this.teaserEditor.setContents(this.content.teaser)
      this.mainEditor.setContents(this.content.main)
    }
    addAngebot(){
      this.angebote.push(      {
        heading: "",
        teaser: "",
        main: "",
        mainImage: "",
        massnahmen: ([] as any[]),
        createdAt: (undefined as Date|undefined),
        lastModifiedAt: (undefined as Date|undefined),
        title: (undefined as string|undefined),
        contact:{
          name: "",
          position: "",
          email: "",
          phone: "",
          image: ""
        }
      });
      this.content = this.angebote[this.angebote.length-1]
      this.teaserEditor.setContents(this.content.teaser)
      this.mainEditor.setContents(this.content.main)
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
      this.load();
    }
    angebote = [
      {
        heading: "",
        teaser: "",
        main: "",
        mainImage: "",
        massnahmen: ([] as any[]),
        createdAt: (undefined as Date|undefined),
        lastModifiedAt: (undefined as Date|undefined),
        title: (undefined as string|undefined),
        contact:{
          name: "",
          position: "",
          email: "",
          phone: "",
          image: ""
        }
      }
    ]
    content = this.angebote[0];
    selection=false;
}
