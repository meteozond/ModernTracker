/*{
	"type": "action",
	"targets": ["omnifocus"],
	"author": "Alexander Klimenko",
	"identifier": "com.omni-automation.of.meteozond-next-month",
	"version": "1.0",
	"description": "Set availability to next month",
	"label": "Next month",
	"shortLabel": "Next month",
	"paletteLabel": "Next month",
	"image": "calendar.circle"
}*/
(() => {
	const action = new PlugIn.Action(function(selection, sender){

		(async () => {
            selection.tasks.forEach(task => {
                let date = new Date()
                date = new Date(date.getFullYear(), date.getMonth() + 1, 1)
                date.setHours(9,0,0,0)
                task.deferDate = date

                date = new Date(date.getFullYear(), date.getMonth() + 1, 0)
                date.setHours(22,0,0,0)
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
