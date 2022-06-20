/*
MIT License

Copyright (c) 2022 Johan Strydom

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var editors = [];

const EditorType = {
  Article: 0,
  Newsletter: 1
};

function tceEditorToolbar(options){
	var _T = this;
	
	_T.id = 0;
	_T.buttons = [];
	_T.node = document.createElement('div');
	_T.editor = null;
	
	_T.icons = [];
	
	_T.icons.push('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eraser-fill" viewBox="0 0 16 16"><path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"></path></svg>'); //WipeContent
	_T.icons.push('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-code-slash" viewBox="0 0 16 16"><path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"></path></svg>'); //ShowCode
	
	if(typeof options != 'undefined'){
		if(typeof options.id != 'undefined'){
			_T.id = options.id;
		}

		if(typeof options.editor != 'undefined'){
			_T.editor = options.editor;
		}
	}
	
	_T.node.id = "tceEditorToolbar-" + _T.id;
	_T.node.className = "tce-editor-toolbar position-absolute top-0 end-0 mt-2 me-2";

	_T.buttonGroup = document.createElement('div');
	_T.buttonGroup.id = "tceEditorToolbarBtns-" + _T.id;
	_T.buttonGroup.className = "tce-editor-buttons btn-group";
	_T.buttonGroup.setAttribute( "role", "group" );
	_T.buttonGroup.setAttribute( "aria-label", "Toolbar Buttons" );
	
	_T.node.appendChild(_T.buttonGroup);
	
	_T.AddButton = function(btnOptions){
		
		newButton =  document.createElement('button');
		newButton.setAttribute( "type", "button" );
		newButton.className = "btn";
	
		if(typeof btnOptions != 'undefined'){
			if(typeof btnOptions.id != 'undefined'){
				newButton.id = btnOptions.id;
			}
			
			if(typeof btnOptions.class != 'undefined'){
				newButton.classList.add(btnOptions.class);
			}
			
			if(typeof btnOptions.title != 'undefined'){
				newButton.setAttribute( "title", btnOptions.title );
				newButton.setAttribute( "data-bs-original-title", btnOptions.title );
			}
			
			if(typeof btnOptions.icon != 'undefined'){
				newButton.innerHTML = btnOptions.icon;
			}
			
			if(typeof btnOptions.text != 'undefined'){
				if(newButton.innerHTML){
					newButton.innerHTML += " ";
				}
				newButton.innerHTML += btnOptions.text;
			}

			if(typeof btnOptions.onclick != undefined){
				newButton.onclick = btnOptions.onclick;
			}
			
		}
		
		_T.buttonGroup.appendChild(newButton);		
		_T.buttons.push(newButton);
	}

	_T.ToggleHtml = function(){
		if(_T.editor){
			var prev = _T.editor.tcePreview;
			var html = _T.editor.tceHtml;
			_T.editor.tceImageToolbar.Hide();
			if(prev.style.visibility == 'visible' || prev.style.visibility == '' ){
				html.value = prev.innerHTML;

				prev.style.visibility = 'hidden';
				prev.classList.add('visually-hidden');

				html.style.visibility = 'visible';
				html.classList.remove('visually-hidden');
				html.classList.add('form-control');
			}else{
				prev.innerHTML = html.value;

				html.style.visibility = 'hidden';
				html.classList.add('visually-hidden');

				_T.editor.InitImages(); //ReInitImages

				prev.style.visibility = 'visible';
				prev.classList.remove('visually-hidden');
			}
		}
	}

	_T.WipeContent = function(){
		if(_T.editor){
			_T.editor.tcePreview.innerHTML = '<p class="lead">&nbsp;</p>';
			_T.editor.tceHtml.value = '<p class="lead">&nbsp;</p>';
			_T.editor.tceImageToolbar.Hide();
		}
	}

	_T.AddButton({"id": "tceBtnWipe-" + _T.id, "class":"btn-wipe","title":"Wipe Content","icon":_T.icons[0],"onclick": _T.WipeContent});
	_T.AddButton({"id": "tceBtnHtml" + _T.id, "class":"btn-code","title":"Show Code","icon":_T.icons[1],"onclick": _T.ToggleHtml });
	
}

function tceImageToolbar(options){
	var _I = this;

	_I.id = 0;
	_I.buttons = [];
	_I.node = document.createElement('div');
	_I.editor = null;
	
	_I.icons = [];
	_I.activeImg = null;
	
	_I.icons.push('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path></svg>'); //Edit
	_I.icons.push('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path></svg>'); //Remove
	
	_I.imgThumbRoot = "";
	_I.imgRoot = "";

	if(typeof options != 'undefined'){
		if(typeof options.id != 'undefined'){
			_I.id = options.id;
		}

		if(typeof options.editor != 'undefined'){
			_I.editor = options.editor;
		}

		if(typeof options.imgRoot != 'undefined'){
			_I.imgRoot = options.imgRoot;
		}

		if(typeof options.imgThumbRoot != 'undefined'){
			_I.imgThumbRoot = options.imgThumbRoot;
		}
	}

	_I.node.id = "tceImgToolbar-" + _I.id;
	_I.node.className = "tce-doc-img-toolbar btn-group visually-hidden position-absolute mb-2 ms-2";
	_I.node.setAttribute( "aria-label","Image Toolbar " + _I.id);
	_I.node.contentEditable = "false";

	_I.AddButton = function(btnOptions){
		
		newButton =  document.createElement('button');
		newButton.setAttribute( "type", "button" );
		newButton.className = "btn";
	
		if(typeof btnOptions != 'undefined'){
			if(typeof btnOptions.id != 'undefined'){
				newButton.id = btnOptions.id;
			}
			
			if(typeof btnOptions.class != 'undefined'){
				newButton.classList.add(btnOptions.class);
			}
			
			if(typeof btnOptions.title != 'undefined'){
				newButton.setAttribute( "title", btnOptions.title );
				newButton.setAttribute( "data-bs-original-title", btnOptions.title );
			}
			
			if(typeof btnOptions.icon != 'undefined'){
				newButton.innerHTML = btnOptions.icon;
			}
			
			if(typeof btnOptions.text != 'undefined'){
				if(newButton.innerHTML){
					newButton.innerHTML += " ";
				}
				newButton.innerHTML += btnOptions.text;
			}

			if(typeof btnOptions.onclick != undefined){
				newButton.onclick = btnOptions.onclick;
			}

			if(typeof btnOptions.modal != undefined){
				newButton.setAttribute( "data-bs-toggle", "modal" );
				newButton.setAttribute( "data-bs-target", btnOptions.modal );
			}
			
		}
		
		_I.node.appendChild(newButton);		
		_I.buttons.push(newButton);
	}

	_I.Show = function(currentImg){
		if(_I.activeImg != null){
			_I.activeImg.classList.remove("tceFocus");
		}
		_I.activeImg = currentImg;

		currentImg.classList.add("tceFocus");

		_I.node.classList.remove("visually-hidden");

		_I.node.style.top = ((currentImg.offsetTop+(currentImg.offsetHeight-31)))+'px';
		_I.node.style.left = currentImg.offsetLeft+'px';

		_I.SetModalInfo(); //set modal info for active img
	}

	_I.Hide = function(){
		if(_I.activeImg){
			_I.activeImg.classList.remove("tceFocus");
		}
		_I.node.classList.add("visually-hidden");
	}

	_I.SetModalInfo = function(currentImg){
		//Modal info for #imgEdit
		if(currentImg != null){
			//Modal inpout elements
		  var imgEditSrc = document.getElementById("imgEditSrc");
		  if(imgEditSrc != null){
			//cater for thumb and image roots
			imgEditSrc.value = currentImg.src.replace(_I.imgThumbRoot,''); //remove thumb roots
			imgEditSrc.value = imgEditSrc.value.replace(_I.imgRoot,''); //remove image root
		  }
		  var imgEditAlt = document.getElementById("imgEditAlt");
		  if(imgEditAlt != null){
			imgEditAlt.value = currentImg.alt;
		  }
		  var imgEditW = document.getElementById("imgEditW");
		  if(imgEditW != null){
			imgEditW.value = currentImg.offsetWidth;
		  }
		  var imgEditH = document.getElementById("imgEditH");
		  if(imgEditH != null){
			imgEditH.value = currentImg.offsetHeight;
		  }

		  var imgRemoveSrc = document.getElementById("imgRemoveSrc");
		  if(imgRemoveSrc != null){
			imgRemoveSrc.innerHTML = '<img src="' + currentImg.src + '" width="240" />';
		  }
		}
	}

	_I.AddButton({ "id": "tceBtnImgEdit-" + _I.id, "class":"btn-img-edit", "title":"Edit Image", "icon":_I.icons[0],"text":"Edit", "modal": "#imgEdit" });
	_I.AddButton({ "id": "tceBtnImgDel-" + _I.id, "class":"btn-img-del", "title":"Remove Image", "icon":_I.icons[1],"text":"Remove", "modal": "#imgRemove" });

}

function tceEditor(options){

	var _E = this;
	
	_E.key = editors.length;
	editors.push(_E);
	
	_E.type = EditorType.Article;
	_E.content = '';
	
	_E.container = null;
	
	_E.tceDoc = document.createElement('div');
	_E.tceDoc.setAttribute( "key", _E.key );

	_E.tceDocEditor = document.createElement('div');
	_E.tcePreview = document.createElement('div');	
	_E.tceHtml = document.createElement('textarea');
	_E.tceToolbar = null;
	_E.tceInlineToolbar = document.createElement('div');
	_E.tceImageToolbar = null;
	
	
	if(typeof options != 'undefined'){
	
		if(typeof options.container != 'undefined'){
			_E.container = document.getElementById( options.container );
		}
		
		if(typeof options.type != 'undefined'){
			_E.type = options.type;
		}

		if(typeof options.content != 'undefined'){
			_E.content = options.content;
		}
		
	}
	
	if(_E.container == null){
		var errNode = document.createElement('div');
		errNode.innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">Editor Container not found<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
		
		document.body.insertBefore( errNode, document.body.firstChild );
		return;
	}

	_E.InitImages =function(){
		var tceImages = _E.tcePreview.getElementsByTagName('img');

		for(var i = 0; i < tceImages.length; i++) {
			tceImages[i].onmouseover = function(){
				_E.tceImageToolbar.Show(this);
			}
		}
	}
	
	_E.Init = function(){
	
		if(!_E.container.classList.contains("clearfix")){
			_E.container.classList.add("clearfix");
		}
	
		_E.tceDoc.id = "tceDocument-" + _E.key;
		_E.tceDoc.className = "tce-doc";
		
		_E.tceDocEditor.id = "tceEditor-" + _E.key;
		_E.tceDocEditor.className = "tce-doc-editor";

		_E.tceToolbar = new tceEditorToolbar({"id": _E.key, "editor": _E });
		
		_E.tcePreview.id = "tcePreview-"+ _E.key;
		_E.tcePreview.className = "tce-doc-preview";
		_E.tcePreview.contentEditable = "true";
		_E.tcePreview.onblur = function(){
			_E.Update();
		}
		_E.tcePreview.innerHTML = _E.content;
		_E.tcePreview.onclick=function(){
			_E.tceImageToolbar.Hide();
		}
		_E.tcePreview.onkeyup=function(){
			_E.tceImageToolbar.Hide();
		}
		
		_E.tceHtml.className = "tce-doc-html";
		_E.tceHtml.id = "tceHtml-"+_E.key;
		_E.tceHtml.classList.add("visually-hidden");
		_E.tceHtml.onblur = function(){
			_E.UpdatePreview();
		}

		_E.tceInlineToolbar.id = "tceInlineToolbar-"+ _E.key;
		_E.tceInlineToolbar.className = "tce-doc-inline-toolbar";
		_E.tceInlineToolbar.classList.add("visually-hidden");

		_E.tceImageToolbar = new tceImageToolbar({"id": _E.key, "editor": _E});
		
		_E.tceDocEditor.appendChild( _E.tceToolbar.node );
		_E.tceDocEditor.appendChild( _E.tceInlineToolbar );
		_E.tceDocEditor.appendChild( _E.tceImageToolbar.node );
		_E.tceDocEditor.appendChild( _E.tcePreview );
		_E.tceDocEditor.appendChild( _E.tceHtml );	
		_E.tceDoc.appendChild( _E.tceDocEditor );		
		_E.container.appendChild( _E.tceDoc );

		_E.InitImages();
	}

	
	
	_E.tceHtml.value= _E.tcePreview.innerHTML;
	
	_E.Update = function(){
		_E.tceHtml.value= _E.tcePreview.innerHTML;
	}
	
	_E.UpdatePreview = function(){
		_E.tcePreview.innerHTML = _E.tceHtml.value;
	}
	
	_E.SetValue = function(szHtml){
		_E.tceHtml.value = szHtml;
		_E.tcePreview.innerHTML = szHtml;
	}
	
	_E.GetValue = function(){
		return _E.tceHtml.value;
	}
	
	_E.Init();
}