$(document)
    .ready(function () {

        let arrayOfToDoItems = [];
        let defaultFilter = "all";
        $("#filters li a[data-filter=all]").addClass("selected");

        function addItem() {
            let stringFromField = $('input[name=ListItem]').val();

            let toDo = {
                id :  generateUUID(),
                name : stringFromField,
                complete : false
            };

            arrayOfToDoItems.push(toDo);
            buildItemList();

            $('input[name=ListItem]').val("");

        }

        function buildItemList() {
            if(defaultFilter === "all"){
                $("#List").empty();
                arrayOfToDoItems.forEach(function(item){
                    let li = document.createElement('li');
                    li.id = item.id;
                    li.name = item.name;
                    if(checkIfToDoIsCompleted(item.complete)){
                        li.style.textDecoration = "line-through";
                        li.style.color = "#999";
                        li.innerHTML = '<input name = "done-todo" type="checkbox" class="done-todo" checked/><span>' + item.name + '</span>';
                    }else{
                        li.innerHTML = '<input name = "done-todo" type="checkbox" class="done-todo" /><span>' + item.name + '</span>';
                    }
                    document.getElementById("List").appendChild(li);
                });
            }
            if(defaultFilter === "complete"){
                $("#List").empty();
                arrayOfToDoItems.forEach(function(item){
                    if(item.complete === true){
                        let li = document.createElement('li');
                        li.id = item.id;
                        li.name = item.name;
                        if(checkIfToDoIsCompleted(item.complete)){
                            li.style.textDecoration = "line-through";
                            li.style.color = "#999";
                            li.innerHTML = '<input name = "done-todo" type="checkbox" class="done-todo" checked/><span>' + item.name + '</span>';
                        }else{
                            li.innerHTML = '<input name = "done-todo" type="checkbox" class="done-todo" /><span>' + item.name + '</span>';
                        }
                        document.getElementById("List").appendChild(li);
                    }
                });
            }
            if(defaultFilter === "active"){
                $("#List").empty();
                arrayOfToDoItems.forEach(function(item){
                    if(item.complete === false){
                        let li = document.createElement('li');
                        li.id = item.id;
                        li.name = item.name;
                        if(checkIfToDoIsCompleted(item.complete)){
                            li.style.textDecoration = "line-through";
                            li.style.color = "#999";
                            li.innerHTML = '<input name = "done-todo" type="checkbox" class="done-todo" checked/><span>' + item.name + '</span>';
                        }else{
                            li.innerHTML = '<input name = "done-todo" type="checkbox" class="done-todo" /><span>' + item.name + '</span>';
                        }
                        document.getElementById("List").appendChild(li);
                    }
                });
            }
            ;
        }

        $(document).on('dblclick', 'li', function () {
            $(this)
                .children('span')
                .attr('contentEditable', 'true')
                .focus()
                .keypress(function (event) {
                    var keycode = (event.keyCode
                        ? event.keyCode
                        : event.which);
                    if (keycode == '13') {
                        event
                            .target
                            .blur();
                        $(this)
                            .children('span')
                            .attr('contenteditable', 'false');

                        arrayOfToDoItems[arrayOfToDoItems.findIndex(el => el.id === this.parentNode.id)].name = this.innerText;
                        buildItemList();

                    }
                });
        });


        function checkIfToDoIsCompleted(item){
            return (item) ? "checked" : "";
        }

        $(document).on('click', 'input[name=done-todo]', function (event) {
            $(this)
                .parent()
                .toggleClass('checked');

            arrayOfToDoItems[arrayOfToDoItems.findIndex(el => el.id === this.parentNode.id)].complete = !arrayOfToDoItems[arrayOfToDoItems.findIndex(el => el.id === this.parentNode.id)].complete;
        buildItemList();
        });

        $('#filters li a').click(function(e){
           e.preventDefault();
           defaultFilter = $(this).data('filter');

            $("#filters li a").removeClass("selected");
            $(this).addClass("selected");

           buildItemList();
        });
        function generateUUID() {
            /*jshint bitwise:false */
            var i,
                random;
            var uuid = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-';
                }
                uuid += (i === 12
                    ? 4
                    : (i === 16
                        ? (random & 3 | 8)
                        : random)).toString(16);
            }
            return uuid;
        }

        $('#button').click(addItem);

    });