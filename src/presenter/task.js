import TaskView from "../view/task.js";
import TaskEditView from "../view/task-edit.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Task {
  constructor(taskListContainer, changeData, changeMode) {
    this._taskListContainer = taskListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._taskComponent = null;
    this._taskEditComponenet = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleArchiveClick = this._handleArchiveClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(task) {
    this._task = task;

    const prevTaskCompenent = this._taskComponent;
    const prevTaskEditComponent = this._taskEditComponenet;

    this._taskComponent = new TaskView(task);
    this._taskEditComponenet = new TaskEditView(task);

    this._taskComponent.setEditClickHandler(this._handleEditCLick);
    this._taskComponent.setFavoriteCLickHandler(this._handleFavoriteClick);
    this._taskComponent.setArchiveClickHandler(this._handleArchiveClick);
    this._taskEditComponenet.setFormSubmitHandler(this._handleFormSubmit);

    if (prevTaskCompenent === null || prevTaskEditComponent === null) {
      render(this._taskListContainer, this._taskComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.EDITING) {
      replace(this._taskComponent, prevTaskCompenent);
    }

    if (this._taskListContainer.getElement().contains(prevTaskEditComponent.getElement())) {
      replace(this._taskEditComponenet, prevTaskEditComponent);
    }

    remove(prevTaskCompenent);
    remove(prevTaskEditComponent);
  }

  destroy() {
    remove(this._taskComponent);
    remove(this._taskEditComponenet);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    replace(this._taskEditComponenet, this._taskComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._taskComponent, this._taskEditComponenet);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToCard();
    }
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._task,
        {
          isFavorite: !this._task.isFavorite
        }
      )
    );
  }

  _handleArchiveClick() {
    this._changeData(
      Object.assign(
        {},
        this._task,
        {
          isArchive: !this._task.isArchive
        }
      )
    );
  }

  _handleFormSubmit() {
    this._replaceFormToCard();
  }
}