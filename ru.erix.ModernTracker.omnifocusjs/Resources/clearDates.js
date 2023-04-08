/*{
	"type": "action",
	"targets": ["omnifocus"],
	"author": "Alexander Klimenko",
	"identifier": "com.omni-automation.of.meteozond-clear-dates",
	"version": "1.0",
	"description": "Clear dates",
	"label": "Clear dates",
	"shortLabel": "Clear dates",
	"paletteLabel": "Clear dates",
	"image": "clock.badge.xmark"
}*/
(() => {
	const action = new PlugIn.Action(function(selection, sender){

		(async () => {
            selection.tasks.forEach(task => {
                task.deferDate = null
                task.dueDate = null
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