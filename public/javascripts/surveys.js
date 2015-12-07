
// $(function(){
//   $("section.option a.option").click(function(e){
//     var lastItemNum = $("#optionline .col-lg-6:last .input-group input").attr("id").replace("option","");
//     var newItem = $("#optionline .col-lg-6:eq(0)").clone();
//     newItem.find(".input-group input").attr("id","option"+(parseInt(lastItemNum)+1));
//     $("#optionline").append(newItem);
//   });
// });
//옵션 추가
function addOption(){
    var optionNum = $("#optionline").children(".col-lg-12").length; // 현재 옵션의 개수
    var scripts = "<div class='col-lg-12'><div class='input-group'><span class='input-group-addon'><input type='checkbox'></span><input type='text' id='option"+
    (parseInt(optionNum)+1)+"' class='form-control' placeholder='옵션"+(parseInt(optionNum)+1)+"'></div></div>"; // 옵션 script
    $("#optionline").append(scripts); // #optionline 밑에 옵션 추가
}

//옵션 삭제
function delOption(){
  $("#optionline .col-lg-12:last").remove();
}

/*global $:false */
/*global _:false */
/*jslint browser:true, devel: true */
var SurvController = function() {
  function setAjaxHandler() {
    $( document ).ajaxStart(function() {
      $("#main").addClass("loading");
    }).ajaxStop(function() {
      $("#main").removeClass("loading");
    });
  }

  function checked(type, value) {
    var e = $("." + type + " .option[data-value='" + value + "']");
    return e.hasClass('selected');
  }

  var Constructor = function () {
    var self = this;
    setAjaxHandler();
    this.taskTemplate = _.template($("#task-template").html());
    this.load();
    $("#post-task").click(function() {
      self.postTask();
    }.bind(this));
    $("section.options a.option")
    .addClass('selected')
    .click(function(e) {
      $(e.currentTarget).toggleClass('selected');
      self.render();
    });

    $("section.options a.all").click(function(e) {
      var section = $($(e.currentTarget).closest('section'));
      var options = section.find('.option');
      if (options.length === section.find('.option.selected').length) {
        options.removeClass('selected');
      } else {
        options.addClass('selected');
      }
      self.render();
    });
  };

  Constructor.prototype._visible = function(task) {
    if (!checked('done', task.done)) {
      return false;
    }
    if (!checked('priority', task.priority)) {
      return false;
    }
    if (_.includes(['개인', '가족', '업무'], task.category)) {
      if (!checked('category', task.category)) {
        return false;
      }
    } else if (!checked('category', '기타')) {
      return false;
    }
    return true;
  };

  Constructor.prototype.load = function() {
    var self = this;
    $.getJSON("/tasks", function(data) {
      self.tasks = data;
      self.render();
      self.clearForm();
    });
  };

  Constructor.prototype.render = function() {
    var self = this;
    $("#main").toggleClass("no-task", (this.tasks.length <= 0));
    var html = _.map(this.tasks, function(task) {
      if (self._visible(task)) {
        task.doneStr = task.done ? 'done' : '';
        return self.taskTemplate(task);
      }
      return "";
    });
    $("ul.tasks").html(html.join("\n"));
    $("ul.tasks .check").click(self.postDone.bind(this));
    $(".task .remove").click(self.removeTask.bind(this));
  };

  Constructor.prototype.clearForm = function() {
    $("#form-task input").val("");
    $("#form-task select[name='category']").val("개인");
    $("#form-task select[name='priority']").val("2");
    $("#form-task input:first").focus();
  };

  Constructor.prototype._findTask = function(e) {
    var el = $(e.currentTarget).closest('li');
    var id = el.data('id');
    return  _.find(this.tasks, {id: id});
  };

  Constructor.prototype.postDone = function(e) {
    var task = this._findTask(e);
    if (!task) {
      return;
    }
    var self = this;
    $.ajax({
      url: '/tasks/' + task.id,
      method: 'PUT',
      dataType: 'json',
      data: {
        done: task.done ? false : true
      },
      success: function(data) {
        task.done = data.done;
        self.render();
      }
    });
  };

  Constructor.prototype.postTask = function() {
    var self = this;
    $.post("/tasks", $("#form-task").serialize(), function(data) {
      console.log(data);
      self.tasks.push(data);
      self.render();
      self.clearForm();
    });
  };

  Constructor.prototype.removeTask = function(e) {
    var task = this._findTask(e);
    if (!task) {
      return;
    }
    var self = this;
    if (confirm('정말로 삭제하시겠습니까?')) {
      $.ajax({
        url: '/tasks/' + task.id,
        method: 'DELETE',
        dataType: 'json',
        success: function(data) {
          self.tasks = _.reject(self.tasks, function(t) {
            return t.id === task.id;
          });
          var el = $(e.currentTarget).closest('li');
          el.remove();
        }
      });
    }
  };

  return Constructor;
} ();
