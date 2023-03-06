import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import suneditor from 'suneditor'

// How to import plugins
import list from 'suneditor/src/plugins/submenu/list'
import {font} from 'suneditor/src/plugins'
import {link} from 'suneditor/src/plugins'
import {blockquote} from 'suneditor/src/plugins'
// How to import language files (default: en)
import de from 'suneditor/src/lang/de'
@Component({
  selector: 'app-rich-text',
  templateUrl: './rich-text.component.html',
  styleUrls: ['./rich-text.component.scss']
})
export class RichTextComponent implements AfterViewInit {
 @ViewChild('editor') public  editor : ElementRef | undefined;
  constructor() { }

  ngAfterViewInit(): void {
    suneditor.create(this.editor?.nativeElement, {
      plugins: [font, list, blockquote, link],
      mode: 'balloon-always',
      buttonList: [
          ['font', 'list', 'blockquote', 'link']
      ],
      lang: de
  });

  //https://blog.angular-university.io/angular-custom-form-controls/


  //https://github.com/photonstorm/phaser3-docs/issues/87

  
  //https://github.com/JiHong88/SunEditor

  // Copies the contents of the suneditor into a [textarea]
// * not working during enabled codeView mode
//editor.save();
// Change the contents of the suneditor
//editor.setContents('set contents');
// Gets the suneditor's context object. Contains settings, plugins, and cached element objects
//editor.getContext();

// Gets the contents of the suneditor
// * not working during enabled codeView mode
// onlyContents {Boolean}: Return only the contents of the body without headers when the "fullPage" option is true
//editor.getContents(onlyContents: Boolean);
// Gets the current contents with containing parent div(div.sun-editor-editable).
//  <div class="sun-editor-editable">{contents}</div>
//editor.getFullContents(onlyContents: Boolean);

  }

}


