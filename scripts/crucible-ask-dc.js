let lastID;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function DoRollWithNewDC(html) {
	let tempDC = parseInt(html[0].querySelector('input').value);
	let rolls = chatMsg.rolls;
	rolls[0].data.dc = tempDC;
	rolls[0].data.rollMode = CONST.DICE_ROLL_MODES.PUBLIC
	
	chatMsg.update({'rolls': rolls, 'blind': false, 'whisper': []});
}

Hooks.on("createChatMessage", (CrucibleChatMessage) => {
	if (CrucibleChatMessage.flags.crucible?.skill == "undefined") {
		return
	}
	
	console.log(CrucibleChatMessage);
	
    if (game.user.isGM && !jQuery.isEmptyObject(CrucibleChatMessage.flags) && CrucibleChatMessage.flags.crucible?.skill in game.system.CONST.SKILLS) {
        chatMsg = CrucibleChatMessage;

        Dialog.prompt({
            title: "Set Difficulty",
            content: "<form><div class=\"form-group\"><label>DC Target</label><input type=\"text\" name=\"dc\" value=\"15\" data-dtype=\"Number\"/></div></form>",
            label: "ok",
			callback: (html) => {
				DoRollWithNewDC(html);
			}
        });
    }
});

Hooks.on("renderStandardCheckDialog", (StandardCheckDialog, html, data) => {
	if (StandardCheckDialog.data.title.includes("Skill Check")) {
		html[0].querySelector("footer.buttons select").innerHTML = "<option value=\"blindroll\">Blind GM Roll</option>";
	}
});