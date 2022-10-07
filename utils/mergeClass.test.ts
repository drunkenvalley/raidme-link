import mergeClass from "./mergeClass"

describe('method mergeClass', () => {
    it('can return single className', () => {
        const expected = 'bg--dark p-4 text-purple'
        expect(mergeClass([expected])).toEqual(expected)
    })

    it('filters empty classNames', () => {
        const expected = 'bg--dark p-4 text-purple'
        expect(mergeClass([expected, ' '])).toEqual(expected)
    })

    it('handles null/undefined', () => {
        const expected = 'bg--dark p-4 text-purple'
        expect(mergeClass([expected, null])).toEqual(expected)
    })

    it('can merge two classNames', () => {
        const classNameA = 'bg--dark p-4'
        const classNameB = 'text-purple'
        const expected = 'bg--dark p-4 text-purple'
        expect(mergeClass([classNameA, classNameB])).toEqual(expected)
    })

    it('can merge three classNames', () => {
        const classNameA = 'bg--dark'
        const classNameB = 'p-4'
        const classNameC = 'text-purple'
        const expected = 'bg--dark p-4 text-purple'
        expect(mergeClass([classNameA, classNameB, classNameC])).toEqual(expected)
    })
})