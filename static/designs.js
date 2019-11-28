$(document).ready(function (){
	var inputHeight = 50;
	var inputWidth= 160;

	$('td').remove();
	$('tr').remove();

	for(i=0;i<=inputHeight-1;i++){
		$('#pixelCanvas').append('<tr id="tableRows"></tr>');
		for(j=0;j<=inputWidth-1;j++){
			$('tr').last().append(`<td id="${(i*inputWidth)+j}"></td>`);			
		}
	}
	colorPicker = $('#colorPicker').val();
    $('#colorPicker').on('change',function(){
    	colorPicker = $('#colorPicker').val();
	})

	var tableGrid = $('#pixelCanvas');
	var catchTable = function(td){
		return {td_id:td.attr('id'), color: td.css('background-color')};
	}
	var down = false;
	$('td').mousedown(function() {
		console.log("cliquei");
		$(this).css('background-color',colorPicker);
		socket.emit('draw', catchTable($(this)));
		down = true;
	}).mouseup(function() {
		console.log("soltei");
		// socket.emit('draw', catchTable());
		down = false;  
	});
	

	$('td').on('mouseover', function(){
		if(down){
			console.log("arrastei");
			$(this).css('background-color',colorPicker);
			socket.emit('draw', catchTable($(this)));
		}
	})
})