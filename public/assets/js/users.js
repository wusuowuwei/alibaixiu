$('#form').on('submit', function () {
    var formData = $(this).serialize()
    console.log(formData)
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function (response) {
            console.log(response)
            location.reload()
        },
        error:function(){
            alert('用户添加失败')
        }
    })
    return false
})
$('#formBox').on('change','#avatar',function(){
    var formData=new FormData()
    console.log(this.files[0])
    formData.append('avatar',this.files[0])
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData:false,
        contentType:false ,
        success:function(response){
            console.log(response)
            $('#preview').attr('src',response[0].avatar)
            $('#hiddenAvatar').val(response[0].avatar)
        }
    })
})
$.ajax({
    type:'get',
    url:'/users',
    success:function (response) {
        var html=template('usersTpl',{usersmess:response})
        $('#listbox').html(html)
    }
})
$('#listbox').on('click','#usermodify',function () {
   var id=$(this).attr('dataId')
   $.ajax({
       type:'get',
       url:'/users/'+id,
       success:function (response) {
           console.log(response)
           var html =template('modifyTpl',response)
           $('#formBox').html(html)
       }
   })
})
$('#formBox').on('submit','#modifyform', function () {
    var formData = $(this).serialize()
    id=$(this).attr('index')
    console.log(formData)
    $.ajax({
        type: 'put',
        url: '/users/'+id,
        data: formData,
        success: function (response) {
            console.log(response)
            location.reload()
        },
        error:function(){
            alert('用户添加失败')
        }
    })
    return false
})