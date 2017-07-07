var laside = document.getElementById('laside');
var head = document.getElementById('thd-t');
var tabh = document.getElementById('tab-h');
var tmd = document.getElementById('mid-t');
var sideMaxHeight = 0;
// function jsonp(params) { 
//       //创建script标签并加入到页面中 
//       var callbackName = params.jsonp; 
//       var head = document.getElementsByTagName('head')[0]; 
//       // 设置传递给后台的回调参数名 
//       params.data['callback'] = callbackName; 
//       var data = formatParams(params.data); 
//       var script = document.createElement('script'); 
//       head.appendChild(script);  

//       //创建jsonp回调函数 
//       window[callbackName] = function(json) { 
//        head.removeChild(script); 
//        clearTimeout(script.timer); 
//        window[callbackName] = null; 
//        params.success && params.success(json); 
//       };  


//       //发送请求 
//       script.src = params.url + '?' + data;  


//       //为了得知此次请求是否成功，设置超时处理 
//       if(params.time) { 
//       script.timer = setTimeout(function() { 
//        window[callbackName] = null; 
//        head.removeChild(script); 
//        params.error && params.error({ 
//         message: '超时' 
//        }); 
//       }, time); 
//       } 

window.onload = function() {
  http();
  setMaxHeight();
}

function http() {
  var xmlhttp = new XMLHttpRequest();
  url = "http://127.0.0.1:8887/data.js";
  xmlhttp.open("get", url, true);
  xmlhttp.send(null);
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4) {
      if (xmlhttp.status == 200) {
        sideparseResults(xmlhttp);
        midparseResults(xmlhttp);
      }
    }
  }
}

// function handleJSONP(res) {
//   console.log(res);
// }

// 2级折叠标题
function sideparseResults(xmlhttp) {
  var resp = xmlhttp.responseText;
  var arr = JSON.parse(resp);
  var laside = document.getElementById('laside');

  for (let k = 0; k < arr.length; k++) {
    var item = document.createElement('div');
    let secl = '';
    var flag = 0;
    item.class = 'item';
    item.style.margin = '20px auto';
    item.style.fontSize = '20px';
    item.style.textAlign = 'center';
    let name = arr[k].name;
    let age = arr[k].age;
    let id = arr[k].id;
    item.innerHTML = name;

    // 添加点击事件
    item.addEventListener('click', function(e) {

      if (flag == 0) {
        secl += '<div id="sec">' + '<p>' + age + '</p>' + '<p>' + id + '</p>' + '</div>'
        e.target.style.background = '#FFFFFF';
        e.target.innerHTML += secl;
        secl = '';
        flag = 1;
      } else {
        e.target.innerHTML = name;
        flag = 0;
        e.target.style.background = '#AE9D9D';
      }
    });
    laside.append(item);
  }

}

// laside.style.maxHeight = laside.scrollHeight + 'px';
function setMaxHeight() {
  setTimeout(function() {
    laside.style.maxHeight = laside.scrollHeight + 'px'
  }, 1000);
}


// 表格展示
function midparseResults(xmlhttp) {
  var resp = xmlhttp.responseText;
  var arr = JSON.parse(resp);
  var midc = document.getElementById('mid-t');
  tmd.innerHTML = "<tr id='hmd'><th>TableHead</th><th>Content</th><th>TableHead</th><th>Select</th></tr>";
  // var tablestr = "<table>";
  // tablestr += "<tr id='hmd'><th>TableHead</th><th>Content</th><th>TableHead</th><th>Select</th></tr>";
  for (let i = 0; i < arr.length; i++) {
    let name = arr[i].name;
    let age = arr[i].age;
    let id = arr[i].id;

    var trnode = document.createElement('tr');
    var namenode = document.createElement('td');
    var nametxt = document.createTextNode(name);
    namenode.appendChild(nametxt);
    trnode.appendChild(namenode);
    var agenode = document.createElement('td');
    var agetxt = document.createTextNode(age);
    agenode.appendChild(agetxt);
    trnode.appendChild(agenode);
    var idnode = document.createElement('td');
    var idtxt = document.createTextNode(id);
    idnode.appendChild(idtxt);
    trnode.appendChild(idnode);
    var btnnode = document.createElement('td');
    btnnode.innerHTML = '<td><button class="edit">Edit</button> <button>Delete</button></td>'
    btnnode.children[0].addEventListener('click', function(e) {
      editRow = e.target.parentNode.parentNode;
      Edit(editRow);
    });
    btnnode.children[1].addEventListener('click', function(e) {
      deleteRow = e.target.parentNode.parentNode;
      Delete(deleteRow);

    });
    trnode.appendChild(btnnode);
    tmd.appendChild(trnode);


    // tablestr += '<tr>' + `<td>${name}</td>` + `<td>${id}</td>` + `<td>${age}</td>` + '<td><button class="edit">Edit</button> <button>Delete</button></td>' + '</tr>'
  }
  // tablestr += "</table>";
  // midc.innerHTML = tablestr;

  setwidth();
}



var layer = document.getElementsByClassName('layer');

function Delete(deleteRow) {
  var deldia = document.getElementById('delete-dia');
  deldia.style.display = 'block';
  var delbtn = document.getElementsByClassName('delbtn');
  layer[0].style.display = 'block';
  delbtn[0].children[0].addEventListener('click', function() {
    deleteRow.innerHTML = '';
    deleteRow.parentNode.removeChild(deleteRow);
    deldia.style.display = 'none';
    layer[0].style.display = 'none';
    laside.style.maxHeight = tmd.scrollHeight + 'px'
  });
  delbtn[0].children[1].addEventListener('click', function() {
    deldia.style.display = 'none';
    layer[0].style.display = 'none';
  });

}

function Edit(editRow) {
  var editdia = document.getElementById('edit-dia');
  editdia.style.display = 'block';
  var editName = document.getElementById('edit-n');
  var editAge = document.getElementById('edit-a');
  var editId = document.getElementById('edit-i');
  editName.value = editRow.children[0].innerHTML;
  editAge.value = editRow.children[1].innerHTML;
  editId.value = editRow.children[2].innerHTML;
  layer[0].style.display = 'block';
  var editbtn = document.getElementsByClassName('edit-btn');
  editbtn[0].children[0].addEventListener('click', function() {
    editRow.children[0].innerHTML = editName.value;
    editRow.children[1].innerHTML = editAge.value;
    editRow.children[2].innerHTML = editId.value;
    editdia.style.display = 'none';
    layer[0].style.display = 'none';
  });
  editbtn[0].children[1].addEventListener('click', function() {
    editdia.style.display = 'none';
    layer[0].style.display = 'none';
  });


}

// 悬浮表头对齐
function setwidth() {
  for (let i = 0; i < tabh.children.length; i++) {
    var hmd = document.getElementById('hmd');
    tabh.children[i].style.width = window.getComputedStyle(hmd.children[i]).width;
  }
}


document.addEventListener('scroll', scrollPage);

function scrollPage(e) {
  laside.style.height = (window.innerHeight - laside.getBoundingClientRect().top) + 'px';
  let tmdRect = tmd.getBoundingClientRect();
  if (tmdRect.top <= 0) {
    head.style.display = 'table';
    head.style.width = tmdRect.width + 'px';
    head.style.left = tmdRect.left + 'px';
  } else {
    head.style.display = 'none';
  }

}

window.addEventListener('resize', resize);

function resize(e) {
  // 实时设置左侧栏高度
  laside.style.height = (window.innerHeight - laside.getBoundingClientRect().top) + 'px';
}