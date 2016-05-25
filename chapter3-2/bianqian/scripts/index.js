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
        var source = event.target; //dom元素
        // console.log(source);
        var nodeInfo = this.getNodeInfo(source);
        console.log(nodeInfo);

        //管道  
        event.dataTransfer.setData("source-id", nodeInfo.id);
        event.dataTransfer.setData("source-class", nodeInfo.className);
        event.dataTransfer.setData("source-title", nodeInfo.title);
        event.dataTransfer.setData("source-datetime", nodeInfo.datetime);
        event.dataTransfer.setData("source-content", nodeInfo.content);


        event.dataTransfer.setData("nodeInfo", nodeInfo);

    },
    dropEvent: function(event) {
        event = event || window.event;
        event.preventDefault();
        var destiny = event.target;


        while (destiny.tagName.toUpperCase() !== "LI") {
            destiny = destiny.parentNode;
        }
        console.log(destiny);

        var destinyInfo = this.getNodeInfo(destiny);
        var sourceInfo = {
            "className": event.dataTransfer.getData("source-class"),
            "title": event.dataTransfer.getData("source-title"),
            "datetime": event.dataTransfer.getData("source-datetime"),
            "content": event.dataTransfer.getData("source-content")
        }
        this.setNodeInfo(destiny,sourceInfo);

        var source = document.getElementById(event.dataTransfer.getData("source-id"));
        this.setNodeInfo(source,destinyInfo);


    },

    getNodeInfo: function(node) {
        var obj = {};
        obj.id = node.id;
        obj.className = node.className;
        // 
        obj.title = node.getElementsByTagName("h4")[0].innerHTML;
        obj.datetime = node.getElementsByTagName("time")[0].innerHTML;
        obj.content = node.getElementsByTagName("span")[0].innerHTML;
        return obj;
    },

    setNodeInfo:function(node,info){
    	node.className = info.className;
    	node.getElementsByTagName("h4")[0].innerHTML = info.title;
    	node.getElementsByTagName("time")[0].innerHTML = info.datetime;
    	node.getElementsByTagName("span")[0].innerHTML = info.content;
    }


}
