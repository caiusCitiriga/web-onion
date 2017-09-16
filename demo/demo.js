console.log(window.WOSDK.addSetsToDispatcher([
    {
        command: 'yolo',
        action: () => {
            alert('Yolo');
        }
    }
]));