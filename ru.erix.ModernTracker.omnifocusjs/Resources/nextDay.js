/*{
	"type": "action",
	"targets": ["omnifocus"],
	"author": "Alexander Klimenko",
	"identifier": "com.omni-automation.of.meteozond-next-day",
	"version": "1.0",
	"description": "Set availability to next day",
	"label": "Next Day",
	"shortLabel": "Next Day",
	"paletteLabel": "Next Day",
	"image": "sun.max.circle"
}*/
(() => {
	const action = new PlugIn.Action(function(selection, sender){

		(async () => {
            selection.tasks.forEach(task => {
                let date = new Date()
                date.setHours(13, 0,0,0)
                date.setDate(date.getDate() + 1);
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