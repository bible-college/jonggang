
/**
 * @interface ICommand
 */
class ICommand {

    execute() {
        throw new Error('Method "execute()" must be implemented.');
    }
}

module.exports = ICommand;