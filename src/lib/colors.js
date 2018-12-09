import SprintStatusEnum from './SprintStatusEnum'

export const colorForStatus = (status) => {
    switch (status) {
        case SprintStatusEnum.FUTURE:
            return 'orange';
        case SprintStatusEnum.PLANNED:
            return 'geekblue';
        case SprintStatusEnum.ACTIVE:
            return 'blue';
        case SprintStatusEnum.IN_REVIEW:
            return 'cyan';
        case SprintStatusEnum.FINALIZING:
            return 'lime';
        case SprintStatusEnum.FINISHED:
            return 'green';

        default:
            return '#888888';
    }
};