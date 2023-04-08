/*{
	"type": "action",
	"targets": ["omnifocus"],
	"author": "Alexander Klimenko",
	"identifier": "com.omni-automation.of.meteozond-this-weekend",
	"version": "1.0",
	"description": "Set availability to this weekend",
	"label": "This weekend",
	"shortLabel": "This weekend",
	"paletteLabel": "This weekend",
	"image": "sofa.fill"
}*/
(() => {
	const action = new PlugIn.Action(function(selection, sender){

		(async () => {
            selection.tasks.forEach(task => {
                let date = new Date()
                date.setDate(date.getDate() + (6 - date.getDay() + 7) % 7);
                date.setHours(9, 0,0,0)
                task.deferDate = date

                date.setDate(date.getDate() + 1);
                date.setHours(22)
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