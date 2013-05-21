$(function() {
	//定义Todo模型
	var Todo = Backbone.Model.extend({
		defaults: function() {
			return {
				title: "Todo 标题", //Todo标题
				order: Todos.nextOrder(), //生成编号
				done: false //标记未完成
			}
		},
		//切换完成状态
		toggle: function() {
			this.save({
				done: !this.get("done")
			});
		}
	});
	//定义Todo容器
	var TodoList = Backbone.Collection.extend({
		model: Todo,
		//本地存储
		localStorage: new Backbone.LocalStorage("todos-backbone"),
		//完成Todo列表
		done: function() {
			return this.where({
				done: true
			});
		},
		//未完成Todo列表
		remaining: function() {
			return this.without.apply(this, this.done());
		},
		//生成下一个Todo编号
		nextOrder: function() {
			if (!this.length) return 1;
			return this.last().get("order") + 1;
		},
		//排序规则
		comparator: "order"
	});
	//实例化容器变量
	var Todos = new TodoList;

	var TodoView = Backbone.View.extend({
		tagName: "li",
		//html模板
		template: _.template($("#item-template").html()),
		//事件配置
		events: {
			"click .toggle": "toggleDone",
			"dblclick .view": "edit",
			"click a.destroy": "clear",
			"keypress .edit": "updateOnEnter",
			"blur .edit": "close"
		},
		//初始化，设置监听model事件
		initialize: function() {
			this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, "destroy", this.remove);
		},
		render: function() {
			//填充html内容
			this.$el.html(this.template(this.model.toJSON()));
			//设置完成状态
			this.$el.toggleClass("done", this.model.get('done'));
			//输入文本框
			this.input = this.$('.edit');
			return this;
		},
		//切换完成状态
		toggleDone: function() {
			this.model.toggle();
		},
		//设置编辑状态
		edit: function() {
			this.$el.addClass("editing");
			this.input.focus();
		},
		//完成编辑
		close: function() {
			var value = this.input.val();
			if (!value) {
				this.clear();
			} else {
				this.model.save({
					title: value
				});
				this.$el.removeClass("editing");
			}
		},
		//回车保存
		updateOnEnter: function(e) {
			if (e.keyCode == 13) this.close();
		},
		//删除
		clear: function() {
			this.model.destroy();
		}

	});

	//App
	var AppView = Backbone.View.extend({
		el: $("#todoapp"),
		//html模板
		statsTemplate: _.template($('#stats-template').html()),
		//事件监听配置
		events: {
			"keypress #new-todo": "createOnEnter",
			"click #clear-completed": "clearCompleted",
			"click #toggle-all": "toggleAllComplete"
		},
		//初始化配置
		initialize: function() {

			this.input = this.$("#new-todo");
			this.allCheckbox = this.$("#toggle-all")[0];

			this.listenTo(Todos, 'add', this.addOne);
			this.listenTo(Todos, 'reset', this.addAll);
			this.listenTo(Todos, 'all', this.render);

			this.footer = this.$('footer');
			this.main = $('#main');
			//加载数据项			
			Todos.fetch();
		},
		//html内容渲染
		render: function() {
			var done = Todos.done().length;
			var remaining = Todos.remaining().length;

			if (Todos.length) {
				this.main.show();
				this.footer.show();
				this.footer.html(this.statsTemplate({
					done: done,
					remaining: remaining
				}));
			} else {
				this.main.hide();
				this.footer.hide();
			}

			this.allCheckbox.checked = !remaining;
		},
		addOne: function(todo) {
			//生成TodoView, 渲染并添加到列表
			var view = new TodoView({
				model: todo
			});
			this.$("#todo-list").append(view.render().el);
		},
		addAll: function() {
			Todos.each(this.addOne, this);
		},
		createOnEnter: function(e) {
			if (e.keyCode != 13) return;
			if (!this.input.val()) return;

			Todos.create({
				title: this.input.val()
			});
			this.input.val('');
		},
		//清空完成项
		clearCompleted: function() {
			_.invoke(Todos.done(), 'destroy');
			return false;
		},
		//切换全部完成状态
		toggleAllComplete: function() {
			var done = this.allCheckbox.checked;
			Todos.each(function(todo) {
				todo.save({
					'done': done
				});
			});
		}

	});
	var App = new AppView;

});