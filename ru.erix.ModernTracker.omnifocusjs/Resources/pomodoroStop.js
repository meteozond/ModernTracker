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
    const action = new PlugIn.Action(function (selection, sender) {

        (async () => {

            ModernTracker.timer.cancel()
            ModernTracker.timer = null

        })().catch(err => {
            if (!err.message.includes("was cancelled")) {
                new Alert(err.name, err.message).show()
            }
        })

    });

    action.validate = function (selection, sender) {
        return (ModernTracker && ModernTracker.timer)
    };

    return action;
})();
