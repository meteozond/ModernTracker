/*{
	"type": "action",
	"targets": ["omnifocus"],
	"author": "Alexander Klimenko",
	"identifier": "com.omni-automation.of.meteozond-this-morning",
	"version": "1.0",
	"description": "Set availability day to this morning",
	"label": "This Morning",
	"shortLabel": "This Morning",
	"paletteLabel": "This Morning",
	"image": "sunrise.fill"
}*/
(() => {
	const action = new PlugIn.Action(function(selection, sender){

		(async () => {
            selection.tasks.forEach(task => {
                let date = new Date()
                date.setHours(9, 0,0,0)
                task.deferDate = date

                date.setHours(13)
                task.dueDate = date
            })

		})().catch(err => {
			if (!err.message.includes("was cancelled")){
				new Alert(err.name, err.message).show()
			}
		})

	});

	action.validate = function(selection, sender){
        return selection.tasks.length > 0
	};
	
	return action;
})();