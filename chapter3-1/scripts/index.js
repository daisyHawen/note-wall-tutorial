var DragHandler = {

    dragEvent: function(event) {
        event = event || window.event;
        event.preventDefault();
    },
    dragOverEvent: function(event) {
        event = event || window.event;
        event.preventDefault();
    },
    dragStartEvent: function(event) {
        event = event || window.event;
        var source = event.target
        var nodeInfo = this.getNodeInfo(source);
        console.log(event);
        
        event.dataTransfer.setData("source-id", nodeInfo.id);
        event.dataTransfer.setData("source-class", nodeInfo.className);
        event.dataTransfer.setData("source-title", nodeInfo.title);
        event.dataTransfer.setData("source-datetime", nodeInfo.datetime);
        event.dataTransfer.setData("source-content", nodeInfo.content);

    },
    dropEvent: function(event) {
        event = event || window.event;
        event.preventDefault();
        console.log(event);
        //万一掉落的不是li节点,则向上找寻LI
        var destiny = event.target;
        while (destiny.tagName.toUpperCase() != "LI") {
            destiny = destiny.parentNode;
            // console.log(node);
        };
        // var parentDom = document.getElementById("wrapper");
        console.log(destiny.id);

        //获取当前目标节点的信息
        //交换node与source

        var destinyInfo = this.getNodeInfo(destiny);
        var sourceInfo = {
            "flag": 1,
            "className": event.dataTransfer.getData("source-class"),
            "title": event.dataTransfer.getData("source-title"),
            "datetime": event.dataTransfer.getData("source-datetime"),
            "content": event.dataTransfer.getData("source-content")
        }

        this.setNodeInfo(destiny, sourceInfo);
        sourceInfo.noteid = Number(destiny.id.split("-")[1]);

        // destiny.className = event.dataTransfer.getData("source-class");
        // destiny.getElementsByTagName("h4")[0].innerHTML = event.dataTransfer.getData("source-title");
        // destiny.getElementsByTagName("time")[0].innerHTML = event.dataTransfer.getData("source-datetime");
        // node.getElementsByTagName("span")[0].innerHTML = event.dataTransfer.getData("source-content");

        var source = document.getElementById(event.dataTransfer.getData("source-id"));
        this.setNodeInfo(source, destinyInfo);
        destinyInfo.noteid = Number(source.id.split("-")[1]);

    },

    getNodeInfo: function(node) {
        var obj = {};

        obj.id = node.id;
        obj.className = node.className;
        obj.title = node.getElementsByTagName("h4")[0].innerHTML;
        obj.datetime = node.getElementsByTagName("time")[0].innerHTML;
        obj.content = node.getElementsByTagName("span")[0].innerHTML;
        obj.flag = 1;
        return obj;
    },
    setNodeInfo: function(node, obj) {
        node.className = obj.className;
        node.getElementsByTagName("h4")[0].innerHTML = obj.title;
        node.getElementsByTagName("time")[0].innerHTML = obj.datetime;
        node.getElementsByTagName("span")[0].innerHTML = obj.content;
        return node;
    }

}
