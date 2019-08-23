
import * as phoneController from './phoneController';

export default (app) => {

    app.post('/', phoneController.generateNumbers);
    app.get('/', phoneController.getNumbers);
    app.delete('/', phoneController.deleteNumbers);
    app.post('/save', phoneController.saveNumbersToFile);
    app.get('/ascending', phoneController.sortInAcendingOrder);
    app.get('/descending', phoneController.sortInDescendingOrder);
}