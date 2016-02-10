import Messenger from './messenger/messenger';
import Patcher from './patcher/patcher';

import CoreModel from './models/core.model';
import DialogModel from './models/dialog.model';
import InputModel from './models/input.model';

const messenger = new Messenger({
    init: false,
    texts: '',
    blogConfig: null,
    papers: null,
    selectPaperIndex: null,
    paperChangePoint: false,
    blogConfigChangePoint: false,
    openDialog: null,
    eventLog: '',
    tools: false
});

const patcher = Patcher();

const coreModel = CoreModel();
const dialogModel = DialogModel();
const inputModel = InputModel();

messenger.flowTo(inputModel);
inputModel.flowTo(dialogModel);
dialogModel.flowTo(coreModel);
coreModel.flowTo(patcher);
patcher.flowTo(messenger);

messenger.listenStart();