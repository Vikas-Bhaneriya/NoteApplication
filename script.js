/*                   
var   NoteCount,   noteExist;
     
      if(localStorage.getItem("noteExist"))
          { 
              if(JSON.parse(localStorage.getItem("noteExist")).length==0)
                  {
                  ShowList(); 
                  Instruction(3);
                  localStorage.setItem("NoteCount",0);  
        
                  }
              else
                  
                ShowList();  
              
          }
      else {
          
          document.getElementById("task").innerHTML="No Notes Available";
          Instruction(1);
         }
         */
    
       function SaveInfo(id) {                  //saves the form data to LS 
                   var d = new Date();
                   var Time = d.toLocaleString();
                   
                   var About = document.forms["FormData"]["about"].value, 
                   Note =document.forms["FormData"]["note"].value, 
                   Priority =document.forms["FormData"]["priority"].value,
                   Type =document.forms["FormData"]["type"].value;
                  
               if (About == "" || Note==" " || Priority == "" || Type=="" ) {
               alert("Fill the information correctly");
               return false;
                        }                                                              
                                                                              
               else{
                   if(! localStorage.getItem('NoteCount'))
                       {
                           localStorage.setItem('NoteCount',1);
                      
                           noteExist=[];
                           noteExist[0]=1;
                           localStorage.setItem("noteExist",JSON.stringify(noteExist));
                       }
                   
                   else 
                        {            
                        var x= Number(localStorage.getItem('NoteCount'))+1;
                        localStorage.setItem('NoteCount',x);
                        noteExist= JSON.parse(localStorage.getItem("noteExist"));
                        noteExist.push(x);
                        localStorage.setItem("noteExist",JSON.stringify(noteExist));    
                    
                        }
                     var NoteInfo ={                                           //JSON Object to save the form data 
                       About: About,
                       Note :Note,
                       Priority :Priority,
                       Type:Type,
                       Time : Time,
                       };
                     localStorage.setItem(Number(localStorage.getItem('NoteCount')),JSON.stringify(NoteInfo) );
                     ShowList();                               
    
                   }
           
           
               }
    
    
    function ShowList()                       // shows the list of Notes                               
     {     
              
                   var data ,l;
                   noteExist= JSON.parse(localStorage.getItem("noteExist"));
                   l = noteExist.length;
                    
          
                   document.getElementById('task').innerHTML=" You have "+ noteExist.length +" Notes Available";
                  
                   var list = document.getElementById("noteList"),j;
                   list.innerHTML="";
                  
                    for (i = l-1 ; i >= 0;i--)                          //adds item  for every task present in LS
                      {  
                               data= JSON.parse(localStorage.getItem(noteExist[i]));
                               var keys = Object.keys( data );
                               var entry = document.createElement('li');                                   
                               var div ;
                               var label;
                               div =document.createElement('div');
                               label=  document.createElement('label');
                               label.innerHTML=" Note  : " ;
                              
                                var LabelText =document.createElement('p');
                                LabelText.innerHTML="" + data.About +" | " +data.Priority+" | "+data.Type;
                               
                             
                                 div.appendChild(label);
                                 div.appendChild(LabelText);
                             
                                entry.appendChild(div);
                                div =document.createElement('div');
                                LabelText =document.createElement('p');
                                LabelText.setAttribute("style","float:right;");
                                LabelText.innerHTML= data.Time;
                          
                                 div.appendChild(LabelText);
                                 entry.appendChild(div);
                          
                                   entry.setAttribute("onclick","showNote("+noteExist[i]+");");
                           
                                    var div =document.createElement('div');
                                   div.setAttribute("class","EDbutton");
                                   var ul =  document.createElement('ul');
                                   var li     =  document.createElement('li');
                                  
                          
                                  var aButton=  document.createElement('a'); 
                                  var img    =  document.createElement('img');
                                    img.setAttribute("src","images/edit.png");
                                    aButton.setAttribute("href","javascript:editNote(" +noteExist[i] +");");
                                    aButton.appendChild(img);
                                    li.appendChild(aButton);
                                    ul.appendChild(li);
                          
                                    li     =  document.createElement('li');
                                    aButton=  document.createElement('a'); 
                                    img    =  document.createElement('img');
                                    img.setAttribute("src","images/delete.png");
                                    aButton.setAttribute("href","javascript:deleteNote(" + noteExist[i] +");");
                                    aButton.appendChild(img);
                                    li.appendChild(aButton);
                                    ul.appendChild(li);
                                      
                          
                                     li     =  document.createElement('li');
                                     aButton=  document.createElement('a'); 
                                     img    =  document.createElement('img');
                                   
                                     switch(data.Type)    // MORE TAGS CAN BE ADDED
                                         {
                                             case "Meeting":
                                                 img.setAttribute("src","images/tag2.png")
                                                 break;
                                                 
                                             case "Task":
                                                 img.setAttribute("src","images/tag3.png")
                                                 break;
                                              case "Reminder":
                                                 img.setAttribute("src","images/tag1.png")
                                                 break;
                                               
                                         }
                                    aButton.appendChild(img);
                                    li.appendChild(aButton);
                                    ul.appendChild(li);
                                     div.appendChild(ul);
                                     entry.appendChild(div);
                                     list.appendChild(entry);
                         
                         }
                  
                    
              }

    
    function deleteNote(id)                               // id is the Note's id to delete
    {    alert("Note will be Permanently deleted !!");
         localStorage.removeItem(id);
         var index = noteExist.indexOf(id);
         if (index > -1) {
            noteExist.splice(index, 1);
         }
     
         localStorage.removeItem(id);
         localStorage.setItem("noteExist",JSON.stringify(noteExist)); 

         Instruction(0);
         ShowList();
               
        
    }
    
    function editNote(id)                            // id is the Note's id to edit node
    {
              var data= JSON.parse(localStorage.getItem(id));
              var noteDiv =document.getElementById("inputDiv"),i;
              noteDiv.innerHTML="";
              var keys = Object.keys(data);
        
             var form = document.createElement('form');
            form.setAttribute("class", "forms");
            form.setAttribute("id","editForm");
            var div =document.createElement('div');
            var label = document.createElement('label');
            var input = document.createElement('input');
        
           label.setAttribute("for",keys[0]);
           label.innerHTML = keys[0] + ":";
           input.setAttribute("type","text");
           input.setAttribute("id",keys[0]);
           input.setAttribute("required","required");
           input.setAttribute("value",data[keys[0]]);
           div.appendChild(label);
           div.appendChild(input);
           form.append(div);
        
          
        //for textarea
             div =document.createElement('div');
            var label = document.createElement('label');
            var textarea = document.createElement('textarea');
           
           label.setAttribute("for",keys[1]+"");
           label.innerHTML = keys[1]+ ":";
           textarea.setAttribute("type","textarea");
           textarea.setAttribute("id",keys[1]);
           textarea.setAttribute("cols","40");
           textarea.setAttribute("rows","10");          
           textarea.setAttribute("required","required");
           textarea.innerHTML=data[keys[1]];
           textarea.setAttribute("value",data[keys[1]]);
           div.appendChild(label);
           div.appendChild(textarea);
           form.append(div);
      
       //radio priority 
        var fieldset = document.createElement('fieldset');
        var legend =document.createElement('legend');
        var input =document.createElement('input'),i;
        legend.innerHTML= keys[2] + ":" 
        
        fieldset.setAttribute("class","radio");
        fieldset.appendChild(legend);
       
        
       for(i=1;i<=5;i++)
           {
            var input =document.createElement('input');
            var  label =document.createElement('label');
            input.setAttribute("type","radio");
            if(i==data.Priority)
            input.setAttribute("checked","checked");
            input.setAttribute("name","priority");   
            input.setAttribute("id",keys[2]);
            input.setAttribute("value",i);
            label.innerHTML= i;
            fieldset.appendChild(input);
            fieldset.appendChild(label);
              
           }
        
        form.appendChild(fieldset);
        
        
        // for Type
        
        div =document.createElement('div');
        label=document.createElement('label');
        label.setAttribute("for", keys[3]);
        label.innerHTML=keys[3] +":";
        var select= document.createElement('select');
        select.setAttribute("name", keys[3]);
        select.setAttribute("id", keys[3]);
        var option1 = document.createElement('option'),option2,option3;
        option2=document.createElement('option');
        option3=document.createElement('option');;
        

        option1.setAttribute("value","Meeting");
        option1.innerHTML= "Meeting";
        
         option2.setAttribute("value","Task");
         option2.innerHTML= "Task";
        
         option3.setAttribute("value","Reminder");
         option3.innerHTML= "Reminder";
        switch(data.Type)
            {
                case "Meeting" :
                    
                    option1.setAttribute("selected","selected");
                    break;
                    
                case  "Task" :
                    
                    option2.setAttribute("selected","selected");
                    break;
                case  "Reminder":
                    
                    option3.setAttribute("selected","selected");
                    break;
            
            }
                    
                
         select.appendChild(option1);
         select.appendChild(option2);
         select.appendChild(option3);
         div.appendChild(label);
         div.appendChild(select);             
         form.appendChild(div);
        
    
        var a= document.createElement('a');
        a.innerHTML=" Save ";
        a.setAttribute("href","javascript:editSave("+id+");");
        
        
       // div.appendChild(a);
        form.appendChild(a);            
        noteDiv.appendChild(form);
        
  
    }
        
    
    
    function editSave(id)
    {  
                   var d = new Date();
                   var Time = d.toLocaleString();
                   
                   var About = document.forms["editForm"]["About"].value, 
                   Note =document.forms["editForm"]["Note"].value, 
                   Priority =document.forms["editForm"]["Priority"].value,
                   Type =document.forms["editForm"]["Type"].value;
                  
               if (About == "" || Note=="" || Priority == "" || Type=="" ) {
               alert("Fill the information correctly");
               return false;
                        }   
        else
            {
                      var NoteInfo ={                       //JSON Object to save the form data 
                       About: About,
                       Note :Note,
                       Priority :Priority,
                       Type:Type,
                       Time : Time,
                       };
                     localStorage.setItem(id,JSON.stringify(NoteInfo));
                     ShowList();            
             Instruction(2);
            
            }
    
    }
        

    function showNote(id)                // to show the single note on the right side
    
    {
          
                 var data= JSON.parse(localStorage.getItem(id));
                 var noteDiv =document.getElementById("inputDiv");
                 noteDiv.setAttribute("style","overflow-y: scroll;")
                 noteDiv.setAttribute("class","UserInput");
                
        
                 noteDiv.innerHTML="";

                  var  div =document.createElement('div');
                  div.setAttribute("class","viewNote");
        
                  var  p=  document.createElement('p');
                  var  h=  document.createElement('h2');
                  h.innerHTML= " Notes : ";
                  p.innerHTML= data.Note+"";
                             
                  div.appendChild(h);
                  div.appendChild(p);
                
        
                  noteDiv.appendChild(div);
  
     }
    
    function Instruction(id)                                     // for instruction 
    {
        var noteDiv, success="";
        
        if(id==1)
            {
             success="Note List is Empty Add new Note +";
              instDiv =document.getElementById("noteList");
            }
       
        else{
          instDiv =document.getElementById("inputDiv");
       
          }
        
           if(id==3)
            {   
                success="Note List is Empty Add new Note +"; 
                instDiv =document.getElementById("noteList");
                
            }   
    instDiv.innerHTML="";
       
    var  div =document.createElement('div');
                  div.setAttribute("class","viewNote");
               
        if (id==2)
            success="Notes saved Successfully !!";
        
         div.innerHTML=   " <p>"+success+" </p><h1>Note Application : </h1><p>Features </p> <ul><li> Add Notes </li>  <li> Add Tags </li> <li> Add Priority </li> <li> Edit Note </li> <li> Delete Note </li>  </ul> <p>Local Storage of your Browser is Used for storing the data </p><p>Use Google Chrome for better functioning  </p>"
                
                  
        instDiv.appendChild(div);
     
    }
    