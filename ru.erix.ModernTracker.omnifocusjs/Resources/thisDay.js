/*{
	"type": "action",
	"targets": ["omnifocus"],
	"author": "Alexander Klimenko",
	"identifier": "com.omni-automation.of.meteozond-this-day",
	"version": "1.0",
	"description": "Set availability to this day",
	"label": "This Day",
	"shortLabel": "This Day",
	"paletteLabel": "This Day",
	"image": "sun.max"
}*/
(() => {
	const action = new PlugIn.Action(function(selection, sender){

		(async () => {
            selection.tasks.forEach(task => {
                let date = new Date()
                date.setHours(13, 0,0,0)
                task.deferDate = date

                date.setHours(18)
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