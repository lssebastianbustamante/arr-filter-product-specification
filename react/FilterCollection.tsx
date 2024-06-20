/* eslint-disable react/jsx-key */
import React, { FC, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import {
  Layout,
  PageHeader,
  PageBlock,
  ButtonGroup,
  Button,
  Input,
  RadioGroup,
} from 'vtex.styleguide'

import './styles.global.css'
import { Tooltip } from 'vtex.styleguide'

const FilterCollection: FC = () => {
  const [formData, setFormData] = useState({
    idCollection: '',
    id: '',
    name: '',
    value: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleValueSelect = (selectedValue: string) => {
    setFormData((prevData) => ({ ...prevData, value: selectedValue }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const btnSubmit = document.querySelector(
        '.btn-submit .vtex-button'
      ) as HTMLButtonElement | null
      if (btnSubmit) {
        btnSubmit.classList.add('addToCartButton-loading')
      }
      const response = await fetch(
        '/arr-filter-product-specification/getNewCollection/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )
      if (btnSubmit) {
        btnSubmit.classList.remove('addToCartButton-loading')
      }
      if (response.status === 200) {
        setFormData({
          idCollection: '',
          id: '',
          name: '',
          value: '',
        })
        showNotification('Se aplicaron los filtros con Exito', '#3f3f40')
      } else {
        setFormData({
          idCollection: '',
          id: '',
          name: '',
          value: '',
        })
        showNotification('No se pudieron aplicar los filtros', '#ff4c4c')
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error)
    }
  }

  function showNotification(messege: string, bgColor: string) {
    const notification = document.createElement('div')
    notification.textContent = messege
    notification.style.fontFamily =
      'Fabriga, -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif'
    notification.style.fontSize = '1rem'
    notification.style.color = '#fff'
    notification.style.textAlign = 'center'
    notification.style.fontWeight = 'normal'
    notification.style.position = 'fixed'
    notification.style.bottom = '-20px' // posicionar la notificación inicialmente fuera de la pantalla
    notification.style.left = '0'
    notification.style.padding = '1rem 2rem 1rem 1rem'
    notification.style.backgroundColor = bgColor
    notification.style.borderRadius = '.25rem'
    notification.style.transition = 'bottom 0.5s ease-out' // añadir propiedad de transición

    const closeButton = document.createElement('button')
    closeButton.textContent = 'X'
    closeButton.style.fontFamily =
      'Fabriga, -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif'
    closeButton.style.fontSize = '14px'
    closeButton.style.color = '#fff'
    closeButton.style.padding = '3px'
    closeButton.style.position = 'absolute'
    closeButton.style.top = '14px'
    closeButton.style.right = '4px'
    closeButton.style.border = 'none'
    closeButton.style.background = 'none'
    closeButton.style.cursor = 'pointer'
    closeButton.style.marginLeft = '10px'

    closeButton.addEventListener('click', function () {
      document.body.removeChild(notification)
    })

    notification.appendChild(closeButton)

    document.body.appendChild(notification)

    // usar setTimeout para comenzar la animación después de que la notificación se haya agregado a la página
    setTimeout(() => {
      notification.style.bottom = '30px'
    }, 100)

    setTimeout(() => {
      // sólo mover la notificación fuera de la pantalla si aún está en el documento
      if (document.body.contains(notification)) {
        notification.style.bottom = '-60px' // mover la notificación fuera de la pantalla nuevamente
      }
    }, 4000)

    // quitar la notificación después de que la animación haya terminado
    setTimeout(() => {
      // sólo intentar quitar la notificación si aún está en el documento
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 5000)
  }

  const promoArray = ['2X1', '3X2', '4X3']

  const valueArray = Array.from(
    { length: 16 },
    (_, index) => `${index * 5 + 5} Off`
  )
  const isFormComplete =
    formData.idCollection !== '' &&
    formData.name !== '' &&
    formData.value !== ''
  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="filter-collection.section" />}
        />
      }
    >
      <PageBlock variation="full">
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <Tooltip label="Colocar el ID Collection" position="right">
              <Input
                label={<FormattedMessage id="form.label.idCollection" />}
                name="idCollection"
                value={formData.idCollection}
                onChange={handleInputChange}
                required
              />
            </Tooltip>
          </div>
          <div className="form-input-radio">
            <p className="form-title">Especificaciones</p>
            <RadioGroup
              name="name"
              options={[
                { value: 'Descuentos', label: 'Descuentos' },
                { value: 'Promociones', label: 'Promociones' },
              ]}
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e)
              }
            />
          </div>
          <div className="form-specfication-percentage">
            <p className="form-title">Porcentaje</p>
            <ButtonGroup
              buttons={valueArray.map((value, index) => (
                <Button
                  key={`descuento-${index}`}
                  isActiveOfGroup={formData.value === value}
                  onClick={() => handleValueSelect(value)}
                >
                  {value}
                </Button>
              ))}
            />
          </div>
          <div className="form-specfication-promotion">
            <p className="form-title">Promocion</p>
            <ButtonGroup
              buttons={promoArray.map((value, index) => (
                <Button
                  key={`promo-${index}`}
                  isActiveOfGroup={formData.value === value}
                  onClick={() => handleValueSelect(value)}
                >
                  {value}
                </Button>
              ))}
            />
          </div>
          <div className="btn-submit">
            <Button type="submit" disabled={!isFormComplete}>
              <FormattedMessage id="form.submitButton-aplicar" />
            </Button>
          </div>
        </form>
      </PageBlock>
    </Layout>
  )
}

export default FilterCollection
